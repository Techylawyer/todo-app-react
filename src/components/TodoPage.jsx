import { useState } from 'react'
import TodoForm from './TodoForm'
import SearchInput from './SearchInput'
import FilterButtons from './FilterButtons'
import TodoList from './TodoList'
import API from './utilities/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import localforage from 'localforage'
import { ClipLoader } from 'react-spinners'
import ReactPaginate from 'react-paginate'
import { useSearchParams, Outlet, Link } from 'react-router-dom'

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

export default function TodoPage() {
  const queryClient = useQueryClient()
  const [newTodo, setNewTodo] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page')) || 1
  const zeroBasedPage = currentPage - 1
  const filter = searchParams.get('filter') || 'all'
  const searchKeyword = searchParams.get('search') || ''

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['todos', zeroBasedPage],
    queryFn: getTodos,
    keepPreviousData: true,
  })

  console.log('Query data:', data)

  const totalTodos = data?.total ?? 0

  const safePage = Math.min(
    zeroBasedPage,
    Math.ceil((data?.total ?? 0) / todosPerPage) - 1
  )

  const createTodo = useMutation({
    mutationFn: (newTodo) =>
      axios.post(API, {
        todo: newTodo.todo,
        completed: newTodo.completed,
        userId: 1,
      }),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(['todos', zeroBasedPage])
      const previousData = queryClient.getQueryData([
        'todos',
        zeroBasedPage,
      ]) || {
        todos: [],
        total: 0,
      }

      const newItem = { ...newTodo, id: Date.now() }
      const updatedTodos = [newItem, ...previousData.todos]

      const newData = {
        todos: updatedTodos,
        total: previousData.total + 1,
      }

      queryClient.setQueryData(['todos', zeroBasedPage], newData)
      await localforage.setItem(`todos-page-${zeroBasedPage}`, newData)

      return { previousData }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos', zeroBasedPage], context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos', zeroBasedPage])
    },
  })

  const updateTodo = useMutation({
    mutationFn: ({ id, ...updatedTodo }) =>
      axios.put(`${API}/${id}`, updatedTodo),
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries(['todos', zeroBasedPage])
      const previousData = queryClient.getQueryData([
        'todos',
        zeroBasedPage,
      ]) || {
        todos: [],
        total: 0,
      }

      const updatedTodos = previousData.todos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      )

      const newData = {
        todos: updatedTodos,
        total: previousData.total,
      }

      queryClient.setQueryData(['todos', zeroBasedPage], newData)
      await localforage.setItem(`todos-page-${zeroBasedPage}`, newData)

      return { previousData }
    },
    onError: (err, updatedTodo, context) => {
      queryClient.setQueryData(['todos', zeroBasedPage], context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos', zeroBasedPage])
    },
  })

  const deleteTodo = useMutation({
    mutationFn: (id) => axios.delete(`${API}/${id}`),
    onMutate: async (id) => {
      await queryClient.cancelQueries(['todos', zeroBasedPage])
      const previousData = queryClient.getQueryData([
        'todos',
        zeroBasedPage,
      ]) || {
        todos: [],
        total: 0,
      }

      const updatedTodos = previousData.todos.filter((todo) => todo.id !== id)

      const newData = {
        todos: updatedTodos,
        total: previousData.total - 1,
      }

      queryClient.setQueryData(['todos', zeroBasedPage], newData)
      await localforage.setItem(`todos-page-${zeroBasedPage}`, newData)

      return { previousData }
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['todos', zeroBasedPage], context.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos', zeroBasedPage])
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
    <>
      <TodoForm
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleSubmit={handleSubmit}
      />
      <section className="filter-search flex gap-2 justify-center w-80 md:w-100">
        <FilterButtons />
        <SearchInput
          searchKeyword={searchKeyword}
          onSearchChange={(value) => {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev)
              next.set('search', value)
              return next
            })
          }}
        />
      </section>
      <section role="region" aria-label="Todo List">
        {isLoading ? (
          <div role="status" aria-live="polite" aria-busy="true">
            <ClipLoader />
          </div>
        ) : isError ? (
          <div role="alert" className='text-destructive'>Error loading todos: {error.message}</div>
        ) : (
          <TodoList
            todoList={filteredTodos}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </section>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(totalTodos / todosPerPage)}
        onPageChange={({ selected }) => {
          const next = new URLSearchParams(searchParams)
          next.set('page', selected + 1)
          // next.set('filter', 'all')
          setSearchParams(next)
        }}
        forcePage={safePage}
        containerClassName="flex items-center flex-wrap justify-center space-x-2 -mt-8  cursor-pointer gap-2 text-center "
        pageClassName="px-3 py-1 border rounded hover:bg-background hover:text-primary transition"
        pageLinkClassName="text-sm  hover:bg-background hover:text-primary"
        activeClassName="bg-primary text-background"
        previousClassName="px-3 py-1 border rounded hover:bg-background hover:text-primary"
        nextClassName="px-3 py-1 border rounded hover:bg-background hover:text-primary"
        breakClassName="px-3 py-1"
        disabledClassName="opacity-50 cursor-not-allowed"
        renderOnZeroPageCount={null}
      />
      <Outlet />
    </>
  )
}
