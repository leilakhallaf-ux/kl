import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TranslationRequest {
  sourceLang: string;
  targetLang: string;
  texts: string[];
}

interface TranslationResult {
  original: string;
  translated: string;
}

async function translateWithClaude(
  texts: string[],
  sourceLang: string,
  targetLang: string,
  apiKey: string
): Promise<TranslationResult[]> {
  const langNames: Record<string, string> = {
    fr: "French",
    en: "English",
    es: "Spanish",
    de: "German",
    it: "Italian",
  };

  const sourceLangName = langNames[sourceLang] || sourceLang;
  const targetLangName = langNames[targetLang] || targetLang;

  const prompt = `You are a professional translator. Translate the following texts from ${sourceLangName} to ${targetLangName}.

IMPORTANT RULES:
- Maintain the same tone and style
- Keep any HTML tags, placeholders, or special characters intact
- For UI text, keep translations concise and natural
- Preserve line breaks and formatting
- Return ONLY the translations in the same order, one per line

Texts to translate:
${texts.map((t, i) => `${i + 1}. ${t}`).join("\n")}

Return only the translations, numbered like the input:`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${error}`);
  }

  const data = await response.json();
  const translatedText = data.content[0].text;

  const lines = translatedText
    .split("\n")
    .filter((line: string) => line.trim())
    .map((line: string) => line.replace(/^\d+\.\s*/, "").trim());

  const results: TranslationResult[] = texts.map((original, i) => ({
    original,
    translated: lines[i] || original,
  }));

  return results;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) {
      throw new Error("ANTHROPIC_API_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const { sourceLang, targetLang, texts }: TranslationRequest = await req.json();

    if (!sourceLang || !targetLang || !texts || !Array.isArray(texts)) {
      return new Response(
        JSON.stringify({ error: "Invalid request format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const results = await translateWithClaude(texts, sourceLang, targetLang, anthropicKey);

    return new Response(JSON.stringify({ translations: results }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Translation failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
