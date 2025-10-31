import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2.5:1.5b",
        prompt,
        stream: true, 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ollama error:", errorText);
      return new Response(`Ollama returned ${response.status}`, { status: 500 });
    }

    // ✅ Stream the response directly to the client
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return new Response(`Error: ${error}`, { status: 500 });
  }
}
