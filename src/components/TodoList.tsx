import TodoListItem from './TodoListItem'
import type { Todo } from './types'

type TodoListProps = {
  todoList: Todo[]
  onUpdate: (todo: Todo) => void
  onDelete: (id: number) => void
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
