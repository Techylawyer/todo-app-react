import { useNavigate } from 'react-router-dom'
export default function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate()

  const handleReset = () => {
    navigate('/todos')
    resetErrorBoundary()
  }
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre className="whitespace-pre-wrap">{error.message}</pre>
      <button onClick={handleReset}>Go to Home Page</button>
    </div>
  )
}
