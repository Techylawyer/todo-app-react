import { Button } from '/components/ui/button'
import { Input } from '/components/ui/input'

export default function TodoForm({ newTodo, setNewTodo, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center w-80 md:w-100"
    >
      <Input
        className="rounded-r-none"
        autoFocus
        type="text"
        name="new-todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="What do you want to do?"
        aria-label="Enter New Todo"
      />
      <Button type="submit" className="rounded-l-none">
        Create Todo
      </Button>
    </form>
  )
}
