import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import routes from './config/router.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './utils/queryClient.ts'

export const MainRouter: React.FC = () => {
  return (
    <Routes>
      {Object.values(routes).map((route, index) => (
        <Route
          key={index}
          {...route}
          element={route.element}
        />
      ))}
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
