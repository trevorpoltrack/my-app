"use client";

import { useState, useRef } from "react";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const responseEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
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

                  setResponse((prev) => {
                    const newText = prev + char;

                    // Scroll to bottom after each character
                    setTimeout(() => {
                      responseEndRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 0);

                    return newText;
                  });

                  await new Promise((r) => setTimeout(r, 10)); // typing effect
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
        // Cancelled; do nothing
      } else {
        console.error("Fetch error:", err);
        setResponse("[Error occurred]");
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
    setResponse((prev) => prev);
  };

  return (
    <div className="p-6 flex flex-col items-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">AI Assistant (Qwen2.5)</h1>

      <div className="flex flex-col w-full max-w-2xl h-full border rounded overflow-hidden">
        {/* Response area */}
        <div className="bg-gray-900 text-white p-4 flex-1 overflow-y-auto whitespace-pre-wrap">
          {response || "The AI's reply will appear here..."}
          <div ref={responseEndRef} />
        </div>

        {/* Input bar */}
        <form className="flex gap-2 p-4 bg-gray-800" onSubmit={handleSubmit}>
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
    </div>
  );
}
