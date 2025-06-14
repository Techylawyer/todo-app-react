import { Button } from '/components/ui/button'
import { useNavigate } from 'react-router-dom'
export default function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate()

  const handleReset = () => {
    navigate('/todos')
    resetErrorBoundary()
  }
  return (
    <aside role="alert" className="flex flex-col p-10 text-center h-screen bg-secondary">
      <h2 className="text-destructive text-2xl text-bold">There was a problem loading this page:</h2>
      <pre className="whitespace-pre-wrap m-10 text-xl">{error.message}</pre>
      <Button className="w-50 mx-auto cursor-pointer" onClick={handleReset}>
        Go to Home Page
      </Button>
    </aside>
  )
}
