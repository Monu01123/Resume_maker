// ─── analysis.js ─────────────────────────────────────────────────────────────
// The Gemini API key is NO LONGER here.
// All AI calls go through our secure backend proxy: POST /api/analyze
// The key lives in Vercel Environment Variables (server-side only).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calls the secure backend proxy to run Gemini AI analysis.
 * The browser never sees the API key.
 *
 * @param {string} resumeText - Extracted text from the PDF
 * @param {string} [role] - Target job role
 * @param {string} [experienceLevel] - Experience level
 * @returns {Promise<Object>} - Structured analysis result
 */
export async function analyzeResume(resumeText, role = "General", experienceLevel = "Mid-Level") {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText,
        role,
        experienceLevel,
      }),
    });

    if (!response.ok) {
      // The server returned a 4xx/5xx — log it and fall through to mock
      const errorBody = await response.json().catch(() => ({}));
      console.error("Backend proxy error:", response.status, errorBody);
      throw new Error(errorBody.error || `Server returned ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("analyzeResume failed:", error.message);
    // Graceful fallback — keeps the UI functional even if the server is down
    return generateMockData(role, experienceLevel);
  }
}

/**
 * Simulates streaming progress while calling the real API.
 * The interval-driven progress updates remain unchanged.
 */
export async function streamAnalyzeResume(resumeText, onChunk, role, experienceLevel) {
  const steps = [
    { status: "Initializing AI model...", progress: 10 },
    { status: `Analyzing for ${role}...`, progress: 30 },
    { status: "Extracting skills and gaps...", progress: 60 },
    { status: "Finalizing insights...", progress: 85 },
  ];

  let currentStep = 0;
  const progressInterval = setInterval(() => {
    if (currentStep < steps.length) {
      onChunk(steps[currentStep]);
      currentStep++;
    }
  }, 1000);

  try {
    const data = await analyzeResume(resumeText, role, experienceLevel);
    clearInterval(progressInterval);
    onChunk({ status: "Analysis Complete!", progress: 100 });
    return data;
  } catch (err) {
    clearInterval(progressInterval);
    throw err;
  }
}

// ─── Mock fallback (used when backend is unreachable) ────────────────────────

function generateMockData(role, experienceLevel) {
  const isSenior = experienceLevel?.includes("Senior") || experienceLevel?.includes("Staff");
  return {
    score: isSenior ? 85 : 78,
    summary: `(Fallback Mode) A strong ${experienceLevel} ${role} resume. The AI service was unavailable, so this is a simulation.`,
    roleMatch: role,
    skills: [
      { name: "React", category: "Frontend", level: "Expert" },
      { name: "JavaScript", category: "Frontend", level: "Advanced" },
    ],
    experience: [],
    gaps: [
      { skill: "AI Integration", suggestion: "Check API Keys on the server." },
    ],
    keywords: {
      found: ["React"],
      missing: ["Gemini"],
    },
  };
}
