export default function TodoForm({ newTodo, setNewTodo, handleSubmit }) {
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