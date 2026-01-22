import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function ScoreCard({ score, label, className }) {
  const radius = 56 // Increased radius for bigger circle
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getColor = (s) => {
    if (s >= 80) return 'text-green-500'
    if (s >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden", className)}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div 
        className="relative w-40 h-40" 
        role="progressbar" 
        aria-valuenow={score} 
        aria-valuemin="0" 
        aria-valuemax="100"
        aria-label={`${label}: ${score} out of 100`}
      >
        <svg className="w-full h-full transform -rotate-90 drop-shadow-lg">
          {/* Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted/10"
          />
          {/* Progress */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className={cn(getColor(score), "filter drop-shadow-[0_0_8px_currentColor]")}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={cn("text-4xl font-bold tracking-tighter", getColor(score))}
          >
            {score}
          </motion.span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-1">Score</span>
        </div>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-foreground tracking-tight">{label}</h3>
    </div>
  )
}
