import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/features/FileUpload'

export default function Home() {
  const navigate = useNavigate()

  const handleFileUpload = (file, text) => {
    navigate('/dashboard', { state: { resumeText: text, fileName: file.name } })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        AI-Powered Resume Intelligence
      </h1>
      <p className="text-xl text-muted-foreground max-w-[600px]">
        Optimize your resume for ATS, identify skill gaps, and get actionable insights to land your dream job.
      </p>
      
      <div className="w-full max-w-2xl mt-8">
        <FileUpload onFileUpload={handleFileUpload} />
      </div>
    </div>
  )
}
