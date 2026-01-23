import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/features/FileUpload'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export default function RoleLandingPage() {
  const { role } = useParams()
  const navigate = useNavigate()
  const { currentUser, loginWithGoogle } = useAuth()
  
  // Format role for display: "software-engineer" -> "Software Engineer"
  const formattedRole = role
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  // SEO: Update Title and Description
  React.useEffect(() => {
    document.title = `Free ${formattedRole} Resume Scanner & Score Checker - Resume Intelligence`
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', `Free ${formattedRole} Resume Scanner. Check your ${formattedRole} resume score, identify missing keywords, and optimize for ATS with AI.`)
    }
  }, [formattedRole])

  const handleFileUpload = async (file, text) => {
    if (!currentUser) {
      toast.error("Please Login First", {
        description: "You need to sign in to analyze your resume.",
        action: {
          label: "Sign In",
          onClick: () => loginWithGoogle()
        }
      })
      return
    }

    navigate('/dashboard', { 
      state: { 
        resumeText: text, 
        fileName: file.name,
        role: formattedRole,
        experienceLevel: "Mid-Level (3-5 years)" // Default for landing page, user can change later
      } 
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center space-y-8 py-10">
        <div className="space-y-4 max-w-3xl px-4">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
            🚀 Specialized for {formattedRole}s
          </div>
          <h1 className="text-4xl font-bold tracking-tight lg:text-6xl text-gradient">
            Free {formattedRole} <br/> Resume Scanner
          </h1>
          <p className="text-lg text-muted-foreground">
            Stop guessing. Use our AI-powered <strong>{formattedRole} resume checker</strong> to see exactly what recruiters are looking for.
          </p>
        </div>
        
        <div className="w-full max-w-xl mx-auto space-y-6 glass-card p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-3">
             <h3 className="text-xl font-semibold">Upload your Resume (PDF)</h3>
             <FileUpload onFileUpload={handleFileUpload} />
          </div>
        </div>

        {/* SEO Content for this specific role */}
        <section className="grid gap-12 max-w-4xl mx-auto pt-10 px-4 text-left">
          <div className="space-y-4">
             <h2 className="text-2xl font-bold">Why use a {formattedRole} Resume Checker?</h2>
             <p className="text-muted-foreground">
               Applying for a <strong>{formattedRole}</strong> position requires highlighting specific technical skills and achievements. 
               Generic resume scanners miss these nuances. Our tool is trained on thousands of <strong>{formattedRole}</strong> job descriptions 
               to give you the competitive edge.
             </p>
          </div>
        </section>
      </div>
    )
  }
