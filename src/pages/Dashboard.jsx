import ScoreCard from '@/components/features/ScoreCard'
import SkillGapList from '@/components/features/SkillGapList'
import KeywordCloud from '@/components/features/KeywordCloud'
import ExperienceTimeline from '@/components/features/ExperienceTimeline'

import { saveAnalysis } from '@/services/history'

export default function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { resumeText, fileName, existingResult } = location.state || {}

  const [status, setStatus] = useState('Initializing...')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    // If we have an existing result (from History), use it directly
    if (existingResult) {
      setResult(existingResult)
      setProgress(100)
      return
    }

    // Otherwise, require resumeText
    if (!resumeText) {
      navigate('/')
      return
    }

    const analyze = async () => {
      try {
        const data = await streamAnalyzeResume(resumeText, (step) => {
          setStatus(step.status)
          setProgress(step.progress)
        })
        setResult(data)
        // Auto-save to history
        saveAnalysis(data)
      } catch (error) {
        console.error("Analysis failed", error)
        setStatus("Analysis failed")
      }
    }

    analyze()
  }, [resumeText, existingResult, navigate])

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-full max-w-md space-y-2">
           <div className="flex justify-between text-sm font-medium">
             <span>{status}</span>
             <span>{progress}%</span>
           </div>
           <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
             <div 
               className="h-full bg-primary transition-all duration-500 ease-out"
               style={{ width: `${progress}%` }}
             />
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
          <p className="text-muted-foreground">
            Analysis for <span className="font-semibold">{fileName}</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
           {/* Actions can go here */}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         {/* Column 1: Score & Summary */}
         <div className="space-y-6">
           <ScoreCard score={result.score} label="ATS Score" className="w-full" />
           <div className="p-6 border rounded-xl bg-card shadow-sm">
             <h3 className="font-semibold mb-3">Executive Summary</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               {result.summary}
             </p>
           </div>
           
           <div className="p-6 border rounded-xl bg-card shadow-sm">
             <h3 className="font-semibold mb-4 text-lg">Top Skills</h3>
             <div className="flex flex-wrap gap-2">
                {result.skills.slice(0, 5).map(skill => (
                    <span key={skill.name} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                        {skill.name}
                    </span>
                ))}
             </div>
           </div>
         </div>
         
         {/* Column 2: Keywords & Experience */}
         <div className="md:col-span-2 space-y-6">
            <div className="p-6 border rounded-xl bg-card shadow-sm">
              <h3 className="font-semibold mb-4 text-lg">Keyword Analysis</h3>
              <KeywordCloud keywords={result.keywords} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="p-6 border rounded-xl bg-card shadow-sm">
                  <h3 className="font-semibold mb-4 text-lg">Experience Impact</h3>
                  <ExperienceTimeline experience={result.experience} />
               </div>

               <div className="p-6 border rounded-xl bg-card shadow-sm">
                  <h3 className="font-semibold mb-4 text-lg">Identified Skill Gaps</h3>
                  <SkillGapList gaps={result.gaps} />
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
