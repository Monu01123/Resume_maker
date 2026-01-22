import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Real AI analysis using Gemini 1.5 Flash.
 * @param {string} resumeText - The extracted text from the resume.
 * @param {string} [role] - Target role
 * @param {string} [experienceLevel] - Experience level
 * @returns {Promise<Object>}
 */
export async function analyzeResume(resumeText, role = "General", experienceLevel = "Mid-Level") {
  try {
    // Using the latest available model found for this key
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
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
          "found": ["string", "string"],
          "missing": ["string", "string"]
        }
      }

      RESUME TEXT:
      ${resumeText.slice(0, 10000)} // Truncate to safety limit if needed
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean markdown code blocks if present
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    // Fallback to mock data on error (or re-throw if preferred)
    return generateMockData(role, experienceLevel);
  }
}

/**
 * Simulates streaming progress while calling the real API.
 */
export async function streamAnalyzeResume(resumeText, onChunk, role, experienceLevel) {
  const steps = [
    { status: 'Initializing AI model...', progress: 10 },
    { status: `Analyzing for ${role}...`, progress: 30 },
    { status: 'Extracting skills and gaps...', progress: 60 },
    { status: 'Finalizing insights...', progress: 85 }
  ];

  // Start the 'fake' progress updates
  let currentStep = 0;
  const progressInterval = setInterval(() => {
    if (currentStep < steps.length) {
      onChunk(steps[currentStep]);
      currentStep++;
    }
  }, 1000); // Update every second

  try {
    // Call Real AI
    const data = await analyzeResume(resumeText, role, experienceLevel);
    
    // Once done, clear interval and finish
    clearInterval(progressInterval);
    onChunk({ status: 'Analysis Complete!', progress: 100 });
    
    return data;
  } catch (err) {
    clearInterval(progressInterval);
    throw err;
  }
}

function generateMockData(role, experienceLevel) {
  // Keep mock generator as fallback
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
      { skill: "AI Integration", suggestion: "Check API Keys." }
    ],
    keywords: {
      found: ["React"],
      missing: ["Gemini"]
    }
  }
}
