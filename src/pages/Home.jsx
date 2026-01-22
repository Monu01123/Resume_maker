import React from 'react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        AI-Powered Resume Intelligence
      </h1>
      <p className="text-xl text-muted-foreground max-w-[600px]">
        Optimize your resume for ATS, identify skill gaps, and get actionable insights to land your dream job.
      </p>
      <div className="flex gap-4">
        <Button size="lg" className="px-8">
          Analyze My Resume
        </Button>
        <Button variant="outline" size="lg">
          View Demo
        </Button>
      </div>
    </div>
  )
}
