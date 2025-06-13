import { useEffect, useState } from "react"
import { FaTrash, FaEdit, FaSave, FaTimesCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function TodoListItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.todo)

  useEffect(() => {
    setEditValue(todo.todo)
  }, [todo.todo])

  const handleSave = () => {
    onUpdate({ id: todo.id, todo: editValue, completed: todo.completed })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(todo.todo)
    setIsEditing(false)
  }

  const handleToggle = () => {
    onUpdate({ id: todo.id, todo: todo.todo, completed: !todo.completed })
  }

  if (isEditing) {
    return (
      <li>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <input
            autoFocus
            type="text"
            name="edit-todo"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button type="submit" aria-label="Save Todo">
            <FaSave />
          </button>
          <button
            aria-label="Cancel Editing"
            type="button"
            onClick={handleCancel}
          >
            <FaTimesCircle />
          </button>
        </form>
      </li>
    )
  }

  return (
    <li style={todo.completed ? { textDecoration: 'line-through' } : {}}>
      <input
        type="checkbox"
        name="check-completed"
        checked={todo.completed}
        onChange={handleToggle}
      />
      <Link to={`./${todo.id}`}>
        <span>{todo.todo}</span>
      </Link>
      <button aria-label="Edit Todo" onClick={() => setIsEditing(true)}>
        <FaEdit />
      </button>
      <button aria-label="Delete Todo" onClick={() => onDelete(todo.id)}>
        <FaTrash />
      </button>
    </li>
  )
}
