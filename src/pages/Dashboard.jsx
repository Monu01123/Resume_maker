import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { streamAnalyzeResume } from '@/services/analysis'
import { saveAnalysis } from '@/services/history'
import { useAuth } from '@/context/AuthContext'

import ScoreCard from '@/components/features/ScoreCard'
import SkillGapList from '@/components/features/SkillGapList'
import KeywordCloud from '@/components/features/KeywordCloud'
import ExperienceTimeline from '@/components/features/ExperienceTimeline'

export default function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { resumeText, fileName, existingResult, role, experienceLevel } = location.state || {}

  const [status, setStatus] = useState('Initializing...')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    // If we have an existing result (from History or previous analysis), use it directly
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

    // Prevent double-call if already analyzing
    let isMounted = true

    const analyze = async () => {
      try {
        const data = await streamAnalyzeResume(resumeText, (step) => {
          if (isMounted) {
            setStatus(step.status)
            setProgress(step.progress)
          }
        }, role, experienceLevel)
        
        if (isMounted) {
          setResult(data)
          // Save to history (Firestore)
          if (currentUser && currentUser.uid) {
             await saveAnalysis(currentUser.uid, data)
          }
          
          // CRITICAL: Update location state so refresh doesn't trigger analysis again
          navigate(location.pathname, { 
            state: { 
              ...location.state, 
              existingResult: data  // Save result to state
            },
            replace: true 
          })
        }
      } catch (error) {
        console.error("Analysis failed", error)
        if (isMounted) setStatus("Analysis failed")
      }
    }

    analyze()
    
    return () => { isMounted = false }
  }, [resumeText, existingResult, navigate, role, experienceLevel, location.pathname, location.state])

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
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Analysis Results</h1>
          <p className="text-muted-foreground mt-1">
            Analysis for <span className="font-semibold text-foreground">{fileName}</span>
            {role && <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{role}</span>}
            {experienceLevel && <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{experienceLevel.split(' (')[0]}</span>}
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
           <div className="p-6 rounded-xl glass-card">
             <h3 className="font-semibold mb-3">Executive Summary</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               {result.summary}
             </p>
           </div>
           
           <div className="p-6 rounded-xl glass-card">
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
            <div className="p-6 rounded-xl glass-card">
              <h3 className="font-semibold mb-4 text-lg">Keyword Analysis</h3>
              <KeywordCloud keywords={result.keywords} />
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-start">
               <div className="p-6 rounded-xl glass-card">
                  <h3 className="font-semibold mb-4 text-lg">Experience Impact</h3>
                  <ExperienceTimeline experience={result.experience} />
               </div>

               <div className="p-6 rounded-xl glass-card">
                  <h3 className="font-semibold mb-4 text-lg">Identified Skill Gaps</h3>
                  <SkillGapList gaps={result.gaps} />
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
