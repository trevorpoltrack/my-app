"use client";

import { useState, useEffect, useRef } from "react";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const responseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.response) {
              // Display one character at a time
              for (const char of json.response) {
                setResponse((prev) => prev + char);
                await new Promise((r) => setTimeout(r, 10)); // typing speed (ms per character)
                responseRef.current?.scrollIntoView({ behavior: "smooth" });
              }
            }
          } catch (err) {
            console.error("Failed to parse chunk:", line, err);
          }
        }
      }

      // Handle any remaining buffered data
      if (buffer.trim()) {
        try {
          const json = JSON.parse(buffer);
          if (json.response) {
            for (const char of json.response) {
              setResponse((prev) => prev + char);
              await new Promise((r) => setTimeout(r, 10));
              responseRef.current?.scrollIntoView({ behavior: "smooth" });
            }
          }
        } catch {}
      }
    } catch (err) {
      console.error("Error sending request:", err);
      setResponse("Error sending request. Check console for details.");
    }

    setIsLoading(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">AI Assistant (Qwen2.5)</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
          className="flex-1 p-2 border rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 rounded text-white"
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </form>

      <div
        className="mt-6 w-full max-w-2xl bg-gray-900 text-white p-4 rounded min-h-[200px] whitespace-pre-wrap overflow-y-auto"
        ref={responseRef}
      >
        {response || "The AI's reply will appear here..."}
      </div>
    </div>
  );
}
