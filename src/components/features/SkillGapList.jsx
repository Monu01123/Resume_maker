import React from 'react'
import { AlertCircle, Lightbulb } from 'lucide-react'

export default function SkillGapList({ gaps }) {
  return (
    <div className="space-y-4">
      {gaps.map((gap, index) => (
        <div key={index} className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                {gap.skill}
              </h4>
              <div className="mt-1 flex items-start gap-2 text-sm text-orange-800 dark:text-orange-200">
                <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
                <p>{gap.suggestion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
