import React from 'react'
import { AlertCircle, Lightbulb } from 'lucide-react'

export default function SkillGapList({ gaps }) {
  return (
    <div className="space-y-4">
      {gaps.map((gap, index) => (
        <div key={index} className="p-4 border rounded-lg bg-card/50 hover:bg-card transition-colors border-border shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-base">
                {gap.skill}
              </h4>
              <div className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                <Lightbulb className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                <p className="leading-relaxed text-foreground/90">{gap.suggestion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
