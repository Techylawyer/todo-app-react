import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom'
import TodoPage from './TodoPage'
import NotFoundPage from './NotFound'
import TodoItemDetail from './TodoItemDetail'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback'
import TestError from './TestError'
import '../styles/App.css'

export default function App() {
  const navigate = useNavigate()

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate('/todos')
      }}
    >
      <main
        region="main"
        className="min-h-screen flex flex-col items-center 
         gap-10 bg-secondary p-5"
      >
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-primary mt-2">
          Todo App
        </h1>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" />} />
          <Route path="/todos/" element={<TodoPage />} />
          <Route path="/todos/:todoId" element={<TodoItemDetail />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/test-error"
            element={
              <ErrorBoundary fallback={<ErrorFallback />}>
                <TestError />
              </ErrorBoundary>
            }
          />
        </Routes>
      </main>
    </ErrorBoundary>
  )
}
