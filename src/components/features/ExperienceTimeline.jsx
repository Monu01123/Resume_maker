import React from 'react'
import { Briefcase } from 'lucide-react'

export default function ExperienceTimeline({ experience }) {
  return (
    <div className="relative space-y-8 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-muted">
      {experience.map((exp, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-4 ring-muted">
             <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 mb-2">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                 {exp.role} 
              </h4>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                {exp.duration}
              </span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {exp.company}
            </p>
            <p className="text-sm text-muted-foreground">
               {exp.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
