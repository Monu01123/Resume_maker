import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { streamAnalyzeResume } from '@/services/analysis'

export default function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { resumeText, fileName } = location.state || {}

  const [status, setStatus] = useState('Initializing...')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
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
      } catch (error) {
        console.error("Analysis failed", error)
        setStatus("Analysis failed")
      }
    }

    analyze()
  }, [resumeText, navigate])

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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
          <p className="text-muted-foreground">
            Analysis for <span className="font-semibold">{fileName}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">ATS Compatibility Score:</span>
            <span className="text-2xl font-bold text-primary">{result.score}/100</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {/* Placeholders for visual components */}
         <div className="p-6 border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
         </div>
         
         <div className="p-6 border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
                {result.skills.slice(0, 5).map(skill => (
                    <span key={skill.name} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                        {skill.name}
                    </span>
                ))}
            </div>
         </div>

         <div className="p-6 border rounded-xl bg-card">
            <h3 className="font-semibold mb-2">Missing Keywords</h3>
             <div className="flex flex-wrap gap-2">
                {result.keywords.missing.slice(0, 5).map(kw => (
                    <span key={kw} className="px-2 py-1 bg-destructive/10 text-destructive rounded-md text-sm">
                        {kw}
                    </span>
                ))}
            </div>
         </div>
      </div>
    </div>
  )
}
