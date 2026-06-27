import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── Helper ────────────────────────────────────────────────────────────────

/**
 * Build the structured-JSON prompt sent to Gemini.
 */
function buildPrompt(resumeText, role, experienceLevel) {
  return `
    Act as an expert Resume Analyzer and Career Coach.
    Analyze the following resume text against the target role of "${role}" at a "${experienceLevel}" level.

    Return a JSON object ONLY, with this exact schema:
    {
      "score": number (0-100),
      "summary": "string (executive summary, max 2 sentences)",
      "roleMatch": "string",
      "skills": [ { "name": "string", "category": "string", "level": "Beginner" | "Intermediate" | "Advanced" | "Expert" } ],
      "experience": [ { "role": "string", "company": "string", "duration": "string", "description": "string (summary)", "impact": "High" | "Medium" | "Low" } ],
      "gaps": [ { "skill": "string", "suggestion": "string" } ],
      "keywords": {
        "found": ["string"],
        "missing": ["string"]
      }
    }

    RESUME TEXT:
    ${resumeText.slice(0, 10000)}
  `;
}

// ─── Vercel Serverless Handler ─────────────────────────────────────────────

export default async function handler(req, res) {
  // 1. Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 2. Set CORS headers so the Vite dev server (localhost:5173) can call this
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 3. Handle CORS pre-flight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 4. Validate request body
  const { resumeText, role = "General", experienceLevel = "Mid-Level" } = req.body || {};

  if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length === 0) {
    return res.status(400).json({ error: "resumeText is required and must be a non-empty string." });
  }

  // 5. Read the API key from SERVER-SIDE environment variable
  //    This value is set in Vercel Dashboard → Project Settings → Environment Variables
  //    It is NEVER shipped to the browser.
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in server environment variables.");
    return res.status(500).json({ error: "Server configuration error: AI service is not configured." });
  }

  // 6. Call Gemini API server-side
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = buildPrompt(resumeText, role, experienceLevel);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Strip any markdown code fences Gemini might wrap around the JSON
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanJson);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Gemini API Error:", error.message);

    // Return a structured error so the frontend can show the mock fallback
    return res.status(502).json({
      error: "AI analysis failed. Please try again.",
      detail: error.message,
    });
  }
}
