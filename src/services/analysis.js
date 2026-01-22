
const MOCK_ANALYSIS = {
  score: 82,
  summary: "A strong Senior Frontend Engineer resume with excellent focus on React and Modern UI. Good quantification of achievements, though some backend skills listed could be more specific.",
  roleMatch: "Senior Frontend Engineer",
  skills: [
    { name: "React", category: "Frontend", level: "Expert" },
    { name: "JavaScript", category: "Frontend", level: "Expert" },
    { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
    { name: "Node.js", category: "Backend", level: "Intermediate" },
    { name: "Git", category: "Tools", level: "Advanced" }
  ],
  experience: [
    { role: "Senior Frontend Engineer", company: "Tech Corp", duration: "2023 - Present", impact: "High", description: "Led migration to Next.js, improved Core Web Vitals by 40%." },
    { role: "Frontend Developer", company: "Startup Inc", duration: "2020 - 2023", impact: "Medium", description: "Built design system from scratch using Tailwind CSS." }
  ],
  gaps: [
    { skill: "Testing Strategy", suggestion: "Mention Jest/Cypress or E2E testing experience explicitly." },
    { skill: "System Design", suggestion: "Add examples of architectural decisions or scale handling." },
    { skill: "Performance", suggestion: "Quantify performance improvements (e.g., 'Reduced LCP by 2s')." }
  ],
  keywords: {
    found: ["React", "Redux", "Vite", "Responsive", "Accessibility", "REST API"],
    missing: ["CI/CD", "Docker", "AWS", "GraphQL", "Next.js"]
  }
}

/**
 * Simulates an AI analysis request with streaming-like delay.
 * @param {string} resumeText - The extracted text from the resume.
 * @returns {Promise<Object>}
 */
export async function analyzeResume(resumeText) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock data
  return MOCK_ANALYSIS;
}

/**
 * Simulates a streaming AI response.
 * @param {string} resumeText 
 * @param {function} onChunk - Callback for each chunk of data
 */
export async function streamAnalyzeResume(resumeText, onChunk) {
  const steps = [
    { status: 'Analyzing structure...', progress: 10 },
    { status: 'Extracting skills...', progress: 30 },
    { status: 'Comparing with industry standards...', progress: 60 },
    { status: 'Generating insights...', progress: 85 },
    { status: 'Finalizing report...', progress: 100 }
  ];

  for (const step of steps) {
    await new Promise(resolve => setTimeout(resolve, 800));
    onChunk(step);
  }

  return MOCK_ANALYSIS;
}
