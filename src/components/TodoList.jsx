import TodoListItem from './TodoListItem'

export default function TodoList({ todoList, onUpdate, onDelete }) {
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
