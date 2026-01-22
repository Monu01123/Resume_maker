import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHistory, clearHistory } from '@/services/history'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowRight, Calendar, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'

export default function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchHistory = async () => {
      if (currentUser?.uid) {
        setLoading(true)
        const data = await getHistory(currentUser.uid)
        setHistory(data)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [currentUser])

  const handleClear = async () => {
    if (confirm('Are you sure you want to clear all history?')) {
      await clearHistory(currentUser.uid)
      setHistory([])
    }
  }

  const handleView = (item) => {
    // Navigate to dashboard with existing result (skip analysis)
    navigate('/dashboard', { state: { existingResult: item, fileName: `Analysis from ${new Date(item.date).toLocaleDateString()}` } })
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Analysis History</h1>
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
                <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="currentColor" strokeWidth="4"
                      fill="transparent"
                      className="text-muted/20"
                    />
                    <circle
                      cx="32" cy="32" r="28"
                      stroke="currentColor" strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={2 * Math.PI * 28 - (item.score / 100) * 2 * Math.PI * 28}
                      strokeLinecap="round"
                      className={cn(
                        item.score >= 80 ? "text-green-500" :
                        item.score >= 60 ? "text-yellow-500" : "text-red-500"
                      )}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={cn(
                      "text-sm font-bold",
                      item.score >= 80 ? "text-green-600 dark:text-green-400" :
                      item.score >= 60 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {item.score}
                    </span>
                  </div>
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
