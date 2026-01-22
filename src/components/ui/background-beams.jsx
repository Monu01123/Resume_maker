import React from 'react'

export const BackgroundBeams = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background">
      {/* Radial Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 h-full w-full bg-grid-pattern opacity-[0.03]" />
      
      {/* Moving Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] animate-blob" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/20 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/20 blur-[100px] animate-blob animation-delay-4000" />
      </div>
    </div>
  )
}
