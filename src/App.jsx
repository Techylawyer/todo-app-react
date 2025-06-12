import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom'
import TodoPage from './TodoPage'
import NotFoundPage from './NotFound'
import TodoItemDetail from './TodoItemDetail'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorBoundary'
import TestError from './TestError'
import './App.css'

export default function App() {
  const navigate = useNavigate()

  function ErrorFallback(){
return ( <aside>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        Go back to Home
      </Link>
    </aside>)
  }
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate('/todos')
      }}
    >
      <main region="main" className="main">
        <h1>Todo App</h1>
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
