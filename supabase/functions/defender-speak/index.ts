const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_WORDS = 400;

const firstChunk = (text: string) => {
  const words = text.replace(/[#*_`>]/g, " ").match(/\S+/g) ?? [];
  return words.slice(0, MAX_WORDS).join(" ");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "Voice is unavailable right now." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { text } = await req.json();
    const speech = firstChunk(String(text ?? "")).trim();
    if (!speech) {
      return new Response(JSON.stringify({ error: "Nothing to read aloud." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-tts-preview",
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "Read this aloud in the calm, confident voice of a seasoned defense attorney reassuring a client: " +
                  speech,
              },
            ],
          },
        ],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Charon" } },
          },
        },
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`defender-speak failed [${response.status}]: ${detail}`);
      const message =
        response.status === 402 || response.status === 403
          ? "Sorry — community credits have run out for today, so the voice is paused."
          : "The voice could not be generated right now.";
      return new Response(JSON.stringify({ error: message }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const audio = await response.arrayBuffer();
    return new Response(audio, {
      headers: {
        ...corsHeaders,
        "Content-Type": response.headers.get("Content-Type") ?? "audio/wav",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("defender-speak error", error);
    return new Response(JSON.stringify({ error: "The voice could not be generated right now." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
