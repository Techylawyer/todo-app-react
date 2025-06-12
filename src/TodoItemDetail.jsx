import { useParams, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

export default function TodoItemDetail() {
  const { todoId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const findTodo = () => {
    const allQueries = queryClient
      .getQueryCache()
      .findAll({ queryKey: ['todos'] })
    for (let query of allQueries) {
      const data = query.state.data
      if (!data) continue
      const match = data.todos.find((t) => t.id === Number(todoId))
      if (match) return match
    }
    return null
  }

  const todo = findTodo()

  if (!todo) {
    return <div>Todo not found.</div>
  }

  return (
    <section
      role="region"
      aria-label="Todo Item Detail"
      className="todoItemDetail"
    >
      <h2>Todo Detail</h2>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Task:</strong> {todo.todo}
      </p>
      <p>
        <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>User:</strong> {todo.userId || 1}
      </p>

      <button onClick={() => navigate('/todos')}>← Back to List</button>
    </section>
  )
}
