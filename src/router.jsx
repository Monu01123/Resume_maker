import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'

const Home = React.lazy(() => import('@/pages/Home'))
const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const History = React.lazy(() => import('@/pages/History'))

const Loading = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<Loading />}><Home /></Suspense>,
      },
      {
        path: '/dashboard',
        element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>,
      },
      {
        path: '/history',
        element: <Suspense fallback={<Loading />}><History /></Suspense>,
      },
    ],
  },
])
