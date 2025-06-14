import { useParams, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { FaArrowLeft } from 'react-icons/fa'
import { Button } from '/components/ui/button'

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
    return (
      <section
        role="alert"
        className="flex flex-col gap-5 pt-10 h-screen text-center"
      >
        <p className="text-destructive text-3xl font-bold pb-10">
          Todo not found.
        </p>
        <Button onClick={() => navigate('/todos')}>
          <FaArrowLeft /> Back to List
        </Button>
      </section>
    )
  }

  return (
    <section
      role="region"
      aria-label="Todo Item Detail"
      className="todoItemDetail h-screen flex flex-col gap-5 pt-5"
    >
      <p>
        <strong>Task ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Task:</strong> {todo.todo}
      </p>
      <p>
        <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>User ID:</strong> {todo.userId || 1}
      </p>

      <Button className="w-50" onClick={() => navigate('/todos')}>
        <FaArrowLeft /> Back to List
      </Button>
    </section>
  )
}
