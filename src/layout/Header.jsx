import React from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { LogOut, User, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

import { useNavigate } from 'react-router-dom'
import { clearHistory } from '@/services/history'

export default function Header() {
  const { currentUser, loginWithGoogle, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle()
      if (user) {
        toast.success(`Welcome back, ${user.displayName}!`, {
          description: "You have successfully signed in.",
        })
      }
    } catch (error) {
      console.error(error)
      toast.error("Login Failed", {
        description: error.message || "Please check your Firebase configuration.",
      })
    }
  }

  const handleLogout = async () => {
    await logout()
    // clearHistory() - No longer needed as history is cloud-based per user
    navigate('/') // Redirect to home
    toast.info("Logged out", {
       description: "See you next time!",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">
            ResumeIntel
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Home
          </Link>
          <Link to="/history" className="transition-colors hover:text-foreground/80 text-foreground/60">
            History
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          {currentUser ? (
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="relative h-9 w-9 rounded-full overflow-hidden border border-border aspect-square p-0">
                   {currentUser.photoURL ? (
                     <img src={currentUser.photoURL} alt="User" className="h-full w-full object-cover" />
                   ) : (
                     <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                       <User className="h-5 w-5" />
                     </div>
                   )}
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56" align="end" forceMount>
                 <DropdownMenuLabel className="font-normal">
                   <div className="flex flex-col space-y-1">
                     <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>
                     <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                   </div>
                 </DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                   <LogOut className="mr-2 h-4 w-4" />
                   <span>Log out</span>
                 </DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" onClick={handleLogin}>
              Sign In with Google
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
