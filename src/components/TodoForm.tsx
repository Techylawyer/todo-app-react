import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TodoFormProps {
  newTodo: string,
  setNewTodo: (value: string) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function TodoForm({ newTodo, setNewTodo, handleSubmit }: TodoFormProps) {
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTodo(e.target.value)
        }
        placeholder="What do you want to do?"
        aria-label="Enter New Todo"
      />
      <Button
        variant="default"
        size="default"
        type="submit"
        className="rounded-l-none cursor-pointer"
      >
        Create Todo
      </Button>
    </form>
  )
}
