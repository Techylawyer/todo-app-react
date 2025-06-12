import { Routes, Route, Navigate } from 'react-router-dom'
import TodoPage from './TodoPage'
import NotFoundPage from './NotFound'
import TodoItemDetail from './TodoItemDetail'
// import './App.css'

export default function App() {
  return (
    <main region="main" className="main">
      <h1>Todo App</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/todos" />} />
        <Route path="/todos/" element={<TodoPage />} />
        <Route path="/todos/:todoId" element={<TodoItemDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}
