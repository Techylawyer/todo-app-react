import TodoListItem from './TodoListItem'

type Todo = {
  id: string
  todo: string
  completed: boolean
}

type TodoListProps = {
  todoList: Todo[]
  onUpdate: (updatedTodo: Todo) => void
  onDelete: (id: string) => void
}

export default function TodoList({ todoList, onUpdate, onDelete } : TodoListProps) {
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
