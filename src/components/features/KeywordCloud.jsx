import React from 'react'
import { BadgeCheck, XCircle } from 'lucide-react'

export default function KeywordCloud({ keywords }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Found Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.found.map((kw) => (
            <span key={kw} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-sm font-semibold">
              <BadgeCheck className="w-4 h-4" />
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Missing Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {keywords.missing.map((kw) => (
            <span key={kw} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive dark:text-red-400 border border-destructive/20 text-sm font-semibold">
              <XCircle className="w-4 h-4" />
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
