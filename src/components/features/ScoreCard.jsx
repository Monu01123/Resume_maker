import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function ScoreCard({ score, label, className }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const getColor = (s) => {
    if (s >= 80) return 'text-green-500'
    if (s >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className={cn("relative flex flex-col items-center justify-center p-6 bg-card rounded-xl border shadow-sm", className)}>
      <div 
        className="relative w-32 h-32" 
        role="progressbar" 
        aria-valuenow={score} 
        aria-valuemin="0" 
        aria-valuemax="100"
        aria-label={`${label}: ${score} out of 100`}
      >
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted/20"
          />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className={getColor(score)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={cn("text-3xl font-bold", getColor(score))}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold">{label}</h3>
    </div>
  )
}
