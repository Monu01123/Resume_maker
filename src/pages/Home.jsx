import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/features/FileUpload'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

const EXPERIENCE_LEVELS = [
  "Intern (< 1 year)",
  "Junior (1-2 years)",
  "Mid-Level (3-5 years)",
  "Senior (5-8 years)",
  "Staff/Principal (8+ years)"
]

export default function Home() {
  const navigate = useNavigate()
  const { currentUser, loginWithGoogle } = useAuth()
  const [role, setRole] = useState('')
  const [experience, setExperience] = useState('')

  const handleFileUpload = async (file, text) => {
    // 1. Check Auth (Requirement: User must be logged in)
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

    // 2. Check Inputs
    if (!role || !experience) {
      toast.warning("Missing Details", {
         description: "Please specify your Target Role and Experience Level."
      })
      return
    }

    navigate('/dashboard', { 
      state: { 
        resumeText: text, 
        fileName: file.name,
        role,
        experienceLevel: experience
      } 
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center space-y-8 py-10">
      <div className="space-y-4 max-w-2xl px-4">
        <h1 className="text-4xl font-bold tracking-tight lg:text-6xl text-gradient">
          Free AI Resume Scanner <br /> & Score Checker
        </h1>
        <p className="text-lg text-muted-foreground">
          Unlock the full potential of your career. Use our <strong>free resume score checker</strong> to get instant, AI-powered feedback tailored to your specific role.
        </p>
      </div>
      
      <div className="w-full max-w-xl mx-auto space-y-6 glass-card p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="grid gap-6 text-left">
          
          <div className="grid gap-2">
            <Label htmlFor="role" className="text-base font-medium">Target Role Use For</Label>
            <Input 
              id="role"
              placeholder="e.g. Frontend Engineer, Product Manager"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-background/50 border-input/50 focus:ring-primary/50 text-lg py-5"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-base font-medium">Experience Level</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {EXPERIENCE_LEVELS.map((level) => (
                <button
                  key={level}
                  onClick={() => setExperience(level)}
                  className={`
                    px-3 py-2 rounded-lg text-sm border transition-all duration-200
                    ${experience === level 
                      ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary/20' 
                      : 'bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground border-border/50'}
                  `}
                >
                  {level.split(' (')[0]}
                  <span className="block text-[10px] opacity-70 font-normal">
                    {level.split(' (')[1].replace(')', '')}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-border/50 space-y-3">
           <Label className="block text-left text-base font-medium">Upload Resume (PDF)</Label>
           
           {!currentUser && (
             <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm">
               <span className="font-semibold">Note:</span> You needs to be logged in to analyze your resume.
             </div>
           )}

           <FileUpload onFileUpload={handleFileUpload} />
        </div>
      </div>


      {/* SEO Content Section */}
      <section className="grid gap-16 max-w-4xl mx-auto pt-10 px-4 pb-20">
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">🤖 Google Gemini AI</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Powered by Google's latest <strong>Gemini 2.5 Flash</strong> model to understand context, nuance, and industry standards better than basic keyword matchers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">🎯 Target Role Matching</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Don't just get generic advice. We analyze your fit specifically for roles like <em>"Senior React Developer"</em> or <em>"Product Manager"</em>.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">🔍 ATS Resume Scanner</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Identify missing keywords and formatting issues. Our <strong>resume scanner</strong> ensures <strong>Applicant Tracking Systems (ATS)</strong> don't reject your application.
            </p>
          </div>
        </div>

        {/* Popular Roles Internal Links */}
        <div className="space-y-6 text-center">
          <h3 className="text-2xl font-bold">Check Resume Score for Popular Roles</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Software Engineer', path: 'software-engineer' },
              { label: 'Product Manager', path: 'product-manager' },
              { label: 'Data Scientist', path: 'data-scientist' },
              { label: 'Marketing Manager', path: 'marketing-manager' },
              { label: 'Sales Representative', path: 'sales-representative' },
            ].map((role) => (
              <a 
                key={role.path}
                href={`/resume-checker/${role.path}`}
                className="px-4 py-2 rounded-full bg-secondary/50 hover:bg-secondary text-sm transition-colors"
              >
                {role.label} Resume Scanner
              </a>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">How to Check Your Resume Score in 3 Steps</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border bg-card/50">
              <div className="text-4xl font-bold text-primary/20 mb-4">01</div>
              <h4 className="font-semibold mb-2">Upload PDF</h4>
              <p className="text-sm text-muted-foreground">Drag & drop your current resume. We support standard PDF formats.</p>
            </div>
            <div className="p-6 rounded-xl border bg-card/50">
              <div className="text-4xl font-bold text-primary/20 mb-4">02</div>
              <h4 className="font-semibold mb-2">Select Role</h4>
              <p className="text-sm text-muted-foreground">Tell the AI which job title you are targeting (e.g., "Full Stack Dev").</p>
            </div>
            <div className="p-6 rounded-xl border bg-card/50">
              <div className="text-4xl font-bold text-primary/20 mb-4">03</div>
              <h4 className="font-semibold mb-2">Get Results</h4>
              <p className="text-sm text-muted-foreground">Receive a detailed score, skill gap analysis, and tailored improvements.</p>
            </div>
          </div>
        </div>

        {/* FAQ for Long-tail Keywords */}
        <div className="text-left space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Is this Resume Scanner free?</h4>
              <p className="text-muted-foreground text-sm">Yes, our <strong>resume score checker</strong> is 100% free. We use advanced AI to help job seekers improve their chances without paywalls.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How improves my ATS Score?</h4>
              <p className="text-muted-foreground text-sm">We compare your resume against millions of data points to find missing hard skills, soft skills, and keywords that recruiters search for.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Is my data private?</h4>
              <p className="text-muted-foreground text-sm">Absolutely. Your resume text is processed securely and we store your history privately in your own account.</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}
