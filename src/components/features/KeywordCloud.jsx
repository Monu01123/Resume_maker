import React from 'react'
import { BadgeCheck, XCircle } from 'lucide-react'

export default function KeywordCloud({ keywords }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Found Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.found.map((kw) => (
            <span key={kw} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium border border-green-200 dark:border-green-900">
              <BadgeCheck className="w-3.5 h-3.5" />
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Missing Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.missing.map((kw) => (
            <span key={kw} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium border border-red-200 dark:border-red-900 opacity-60 hover:opacity-100 transition-opacity">
              <XCircle className="w-3.5 h-3.5" />
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
