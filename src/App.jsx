import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'
import localforage from 'localforage'
import { FaTrash, FaEdit, FaSave, FaTimesCircle } from 'react-icons/fa'
// import './App.css'
import { ClipLoader } from 'react-spinners'
import ReactPaginate from 'react-paginate'
import {Routes, Route, Navigate} from 'react-router-dom'

const API = 'https://dummyjson.com/todos'
const todosPerPage = 10

localforage.config({
  name: 'todoApp',
  storeName: 'todos',
})

const getTodos = async ({ queryKey }) => {
  const [_key, page] = queryKey

  const cached = await localforage.getItem(`todos-page-${page}`)
  if (cached) {
    console.log('Loaded from cache:', cached)
    console.log('cached.todos:', cached.todos)
    return cached
  }

  const res = await axios.get(
    `${API}?limit=${todosPerPage}&skip=${page * todosPerPage}`
  )
  const data = { todos: res.data.todos, total: res.data.total }

  await localforage.setItem(`todos-page-${page}`, data)
  return data
}

export default function App() {
  const queryClient = useQueryClient()
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos', currentPage],
    queryFn: getTodos,
    keepPreviousData: true,
  })

  console.log('Query data:', data)

  const totalTodos = data?.total ?? 0

  const createTodo = useMutation({
    mutationFn: (newTodo) =>
      axios.post(API, {
        todo: newTodo.todo,
        completed: newTodo.completed,
        userId: 1,
      }),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(['todos', currentPage])
      const previousData = queryClient.getQueryData(['todos', currentPage]) || {
        todos: [],
        total: 0,
      }

      const newItem = { ...newTodo, id: Date.now() }
      const updatedTodos = [newItem, ...previousData.todos]

      const newData = {
        todos: updatedTodos,
        total: previousData.total + 1,
      }

      queryClient.setQueryData(['todos', currentPage], newData)
      await localforage.setItem(`todos-page-${currentPage}`, newData)

      return { previousData }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos', currentPage], context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos', 0])
    },
  })

  const updateTodo = useMutation({
    mutationFn: ({ id, ...updatedTodo }) =>
      axios.put(`${API}/${id}`, updatedTodo),
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries(['todos', currentPage])
      const previousData = queryClient.getQueryData(['todos', currentPage]) || {
        todos: [],
        total: 0,
      }

      const updated = previousData.todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )

      const newData = {
        todos: updated,
        total: previousData.total,
      }

      queryClient.setQueryData(['todos', currentPage], newData)
      await localforage.setItem(`todos-page-${currentPage}`, newData)

      return { previousData }
    },
    onError: (err, updatedTodo, context) => {
      queryClient.setQueryData(['todos', currentPage], context.previousTodos)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos', currentPage])
      localforage.removeItem(`todos-page-${currentPage}`)
    },
  })

  const deleteTodo = useMutation({
    mutationFn: (id) => axios.delete(`${API}/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries(['todos', currentPage])
      const previousData = queryClient.getQueryData(['todos', currentPage]) || {
        todos: [],
        total: 0,
      }

      const updatedTodos = previousData.todos.filter((todo) => todo.id !== id)

      const newData = {
        todos: updatedTodos,
        total: previousData.total - 1,
      }

      queryClient.setQueryData(['todos', currentPage], newData)
      await localforage.setItem(`todos-page-${currentPage}`, newData)

      return { previousData }
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['todos', currentPage], context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos', currentPage])
      localforage.removeItem(`todos-page-${currentPage}`)
    },
  })

  const filteredTodos = (data?.todos || []).filter((todo) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'active'
        ? !todo.completed
        : todo.completed

    const matchesSearch =
      !searchKeyword.trim() ||
      todo.todo.toLowerCase().includes(searchKeyword.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    createTodo.mutate({ todo: newTodo, completed: false })
    setNewTodo('')
  }

  const handleUpdate = (todo) => {
    updateTodo.mutate(todo)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      deleteTodo.mutate(id)
    }
  }

  console.log('Fetched todos:', data?.todos)
  console.log('Filtered todos:', filteredTodos)

  return (
    <main region="main" className="main">
      <h1>Todo App</h1>

      

      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleSubmit={handleSubmit}
      />

      <FilterButtons current={filter} setFilter={setFilter} />

      <SearchInput
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <section role="region" aria-label="Todo List">
        {isLoading ? (
          <div role="status" aria-live="polite" aria-busy="true">
            <ClipLoader />
          </div>
        ) : isError ? (
          <div role="alert">Error loading todos: {error.message}</div>
        ) : (
          <TodoList
            todoList={filteredTodos}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </section>
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={Math.ceil(totalTodos / todosPerPage)}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </main>
  )
}

function FilterButtons({ current, setFilter }) {
  return (
    <section className="filter-section" role="region" aria-label="Filter Todos">
      <button onClick={() => setFilter('all')} disabled={current === 'all'}>
        All Todos
      </button>
      <button
        onClick={() => setFilter('active')}
        disabled={current === 'active'}
      >
        Active Todos
      </button>
      <button
        onClick={() => setFilter('completed')}
        disabled={current === 'completed'}
      >
        Completed Todos
      </button>
    </section>
  )
}

function TodoList({ todoList, onUpdate, onDelete }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

function TodoListItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.todo)

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
      <span>{todo.todo}</span>
      <button aria-label="Edit Todo" onClick={() => setIsEditing(true)}>
        <FaEdit />
      </button>
      <button aria-label="Delete Todo" onClick={() => onDelete(todo.id)}>
        <FaTrash />
      </button>
    </li>
  )
}

function TodoForm({ newTodo, setNewTodo, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        type="text"
        name="new-todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="What do you want to do?"
        aria-label="Enter New Todo"
      />
      <button type="submit">Create Todo</button>
    </form>
  )
}

function SearchInput({ searchKeyword, setSearchKeyword }) {
  return (
    <section role="region" aria-label="Search Todos">
      <input
        type="text"
        placeholder="Search todos..."
        name="search-todo"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </section>
  )
}
