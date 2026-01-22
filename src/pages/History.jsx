import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHistory, clearHistory } from '@/services/history'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function History() {
  const [history, setHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory()
      setHistory([])
    }
  }

  const handleView = (item) => {
    // Navigate to dashboard with existing result (skip analysis)
    navigate('/dashboard', { state: { existingResult: item, fileName: `Analysis from ${new Date(item.date).toLocaleDateString()}` } })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
          <p className="text-muted-foreground">
            View your past resume analyses and improvements.
          </p>
        </div>
        {history.length > 0 && (
          <Button variant="destructive" size="sm" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear History
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border rounded-xl border-dashed bg-muted/10">
          <p className="text-muted-foreground mb-4">No analysis history found.</p>
          <Button onClick={() => navigate('/')}>Analyze New Resume</Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-center justify-between p-6 border rounded-xl bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <div className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg",
                   item.score >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                   item.score >= 60 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}>
                  {item.score}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.roleMatch || "Resume Analysis"}</h3>
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{new Date(item.date).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                className="mt-4 sm:mt-0 w-full sm:w-auto gap-2 group"
                onClick={() => handleView(item)}
              >
                View Report
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
