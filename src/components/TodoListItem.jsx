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

  const handleCancel = (e) => {
    if (e.keyCode === 27) {
      setEditValue(todo.todo)
      setIsEditing(false)
    }
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
          className="flex justify-between items-center gap-8"
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          <Input
            className="w-full"
            autoFocus
            type="text"
            name="edit-todo"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div className="btn-group flex justify-between gap-5">
            <Button
              size="icon"
              className="size-6 cursor-pointer"
              type="submit"
              aria-label="Save Todo"
            >
              <FaCheckCircle />
            </Button>
            <Button
              size="icon"
              className="size-6 cursor-pointer"
              aria-label="Cancel Editing"
              type="button"
              onClick={handleCancel}
            >
              <FaTimesCircle />
            </Button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li
      style={todo.completed ? { textDecoration: 'line-through' } : {}}
      className="flex gap-5 items-center justify-between"
    >
      <div className="flex items-center">
        <input
          className="h-5 w-5 accent-primary"
          type="checkbox"
          name="check-completed"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <Link to={`./${todo.id}`}>
          <p className="hover:bg-blue p-2 w-full">{todo.todo}</p>
        </Link>
      </div>

      <section className="btn-wrap flex gap-5">
        <Button
          size="icon"
          className="size-6 cursor-pointer"
          aria-label="Edit Todo"
          onClick={() => setIsEditing(true)}
        >
          <FaEdit />
        </Button>
        <Button
          size="icon"
          className="size-6 cursor-pointer"
          aria-label="Delete Todo"
          onClick={() => onDelete(todo.id)}
        >
          <FaTrash />
        </Button>
      </section>
    </li>
  )
}
