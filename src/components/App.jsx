import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom'
import TodoPage from './TodoPage'
import NotFoundPage from './NotFound'
import TodoItemDetail from './TodoItemDetail'
import { ErrorBoundary } from 'react-error-boundary'
import TestError from './TestError'
import '../styles/App.css'
import { Button, Box, Heading } from '@chakra-ui/react'

export default function App() {
  const navigate = useNavigate()

  function ErrorFallback() {
    return <NotFoundPage />
  }

  return (
    <ErrorBoundary
      FallbackComponent={<ErrorFallback />}
      onReset={() => {
        navigate('/todos')
      }}
    >
      <Box as="main" region="main" className="main bg-red" p={4} bg={'green.100'} w="100%">
        <Heading>Todo App</Heading>
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
      </Box>
    </ErrorBoundary>
  )
}
