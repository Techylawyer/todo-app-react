
export type Todo = {
  id: number 
  todo: string
  completed: boolean
  userId?: number
}

export type TodosResponse = {
  todos: Todo[]
  total: number
}
