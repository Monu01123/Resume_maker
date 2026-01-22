const KEY = 'resume_intel_history'

export const saveAnalysis = (analysisResult) => {
  try {
    const history = getHistory()
    const newItem = { 
      ...analysisResult, 
      id: Date.now().toString(), 
      date: new Date().toISOString() 
    }
    const updatedHistory = [newItem, ...history].slice(0, 50) // Limit to 50
    localStorage.setItem(KEY, JSON.stringify(updatedHistory))
    return newItem
  } catch (error) {
    console.error('Failed to save history', error)
    return null
  }
}

export const getHistory = () => {
  try {
    const item = localStorage.getItem(KEY)
    return item ? JSON.parse(item) : []
  } catch (error) {
    console.error('Failed to get history', error)
    return []
  }
}

export const clearHistory = () => {
  localStorage.removeItem(KEY)
}
