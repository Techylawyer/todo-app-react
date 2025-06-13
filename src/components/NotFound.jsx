import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <aside>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </aside>
  )
}
