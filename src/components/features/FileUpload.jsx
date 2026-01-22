import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, FileText, X, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { extractTextFromPDF } from '@/services/pdf'

export default function FileUpload({ onFileUpload }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [isParsing, setIsParsing] = useState(false)

  const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
    setError(null)
    if (fileRejections.length > 0) {
      setError('Please upload a valid PDF file under 5MB.')
      return
    }
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0]
      setFile(uploadedFile)
      setIsParsing(true)
      
      try {
        const text = await extractTextFromPDF(uploadedFile)
        onFileUpload && onFileUpload(uploadedFile, text)
        setIsParsing(false)
      } catch (err) {
        setError(err.message)
        setIsParsing(false)
        setFile(null)
      }
    }
  }, [onFileUpload])

  const removeFile = () => {
    setFile(null)
    setError(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode='wait'>
        {!file ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="upload-zone"
          >
            <div
              {...getRootProps()}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ease-in-out focus-visible:outline-none",
                isDragActive
                  ? "border-primary bg-primary/5 scale-[1.02] shadow-lg"
                  : "border-border/60 hover:border-primary/50 hover:bg-muted/30 hover:scale-[1.01]"
              )}
            >
              <input {...getInputProps()} aria-label="Upload Resume PDF" />
              <div className="flex flex-col items-center justify-center pt-2 pb-3 text-center space-y-3">
                <div className={cn(
                  "p-3 rounded-full transition-colors duration-300",
                  isDragActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground group-hover:text-primary"
                )}>
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-foreground">
                    {isDragActive ? "Drop it like it's hot!" : "Click to upload or drag & drop"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supported Format: PDF (Max 5MB)
                  </p>
                </div>
              </div>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 text-sm text-center text-destructive font-medium"
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key="file-preview"
            className="w-full"
          >
             <div className="relative overflow-hidden rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-sm">
                <div className="p-5 flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                     <CheckCircle className="w-5 h-5 text-green-500 animate-in zoom-in" />
                     <Button variant="ghost" size="icon" onClick={removeFile} aria-label="Remove file" className="hover:bg-destructive/10 hover:text-destructive transition-colors">
                       <X className="w-4 h-4" />
                     </Button>
                  </div>
                </div>
                {/* Progress bar placeholder - can be real later */}
                <div className="h-1 w-full bg-muted overflow-hidden">
                  {isParsing ? (
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-purple-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  ) : (
                    <div className="h-full w-full bg-green-500" />
                  )}
                </div>
             </div>
             
             <div className="mt-6 flex justify-center">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto min-w-[200px]" 
                  onClick={() => console.log('Analyze')}
                  disabled={isParsing}
                >
                  {isParsing ? 'Parsing PDF...' : 'Analyze Resume'}
                </Button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
