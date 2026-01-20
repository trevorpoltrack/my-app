"use client";

import { useState, useRef } from "react";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("What can I help you with?");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !input.trim()) return;

    setResponse("");
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
        signal: controller.signal,
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunkText = decoder.decode(value, { stream: true }).trim();
          const lines = chunkText.split("\n");

          for (const line of lines) {
            if (!line) continue;

            try {
              const json = JSON.parse(line);
              if (json.response) {
                for (const char of json.response) {
                  if (abortControllerRef.current?.signal.aborted) break;
                  setResponse((prev) => prev + char);
                  await new Promise((r) => setTimeout(r, 10));
                }
              }
              if (json.done) done = true;
            } catch (err) {
              console.error("JSON parse error:", err, line);
            }
          }
        }
      }
    } catch (err) {
      if ((err as any).name === "AbortError") {
        setResponse((prev) => prev);
      } else {
        console.error("Fetch error:", err);
        setResponse("[Error occurred]");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      setInput("");
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (abortControllerRef.current) abortControllerRef.current.abort();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-4">
      <h1 className="text-xl font-semibold mb-2 text-white text-center">
        AI Assistant (Qwen2.5)
      </h1>

      {/* Response area */}
      <div
        className="bg-gray-900 text-white p-3 rounded whitespace-pre-wrap overflow-y-auto mb-2"
        style={{ maxHeight: "300px", minHeight: "80px" }}
      >
        {response}
      </div>

      {/* Input bar fixed at bottom */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center sticky bottom-0 bg-gray-800 p-2 rounded"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          className="flex-1 p-2 border rounded bg-gray-700 text-white"
          disabled={isLoading}
        />
        {isLoading ? (
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-600 rounded text-white"
          >
            Cancel
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded text-white"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
