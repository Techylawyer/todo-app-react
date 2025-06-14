import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from '/components/ui/button'
import { Input } from '/components/ui/input'

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
          className="flex gap-5 justify-center m-auto"
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <Input
            className="w-80"
            autoFocus
            type="text"
            name="edit-todo"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <Button
            size="icon"
            className="size-6"
            type="submit"
            aria-label="Save Todo"
          >
            <FaCheckCircle />
          </Button>
          <Button
            size="icon"
            className="size-6"
            aria-label="Cancel Editing"
            type="button"
            onClick={handleCancel}
          >
            <FaTimesCircle />
          </Button>
        </form>
      </li>
    )
  }

  return (
    <li
      style={todo.completed ? { textDecoration: 'line-through' } : {}}
      className="grid grid-cols-2 items-center justify-center gap-y-10 mb-5"
    >
      <section>
        <input
          className="h-5 w-5 accent-primary"
          type="checkbox"
          name="check-completed"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <Link to={`./${todo.id}`}>
          <span className="hover:bg-blue p-4 w-80">{todo.todo}</span>
        </Link>
      </section>

      <section className="btn-wrap flex gap-5">
        <Button
          size="icon"
          className="size-6"
          aria-label="Edit Todo"
          onClick={() => setIsEditing(true)}
        >
          <FaEdit />
        </Button>
        <Button
          size="icon"
          className="size-6"
          aria-label="Delete Todo"
          onClick={() => onDelete(todo.id)}
        >
          <FaTrash />
        </Button>
      </section>
    </li>
  )
}
