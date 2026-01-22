import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import History from '@/pages/History'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/history',
        element: <History />,
      },
    ],
  },
])
