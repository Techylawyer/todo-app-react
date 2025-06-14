import { Link } from 'react-router-dom'
import { Button } from '/components/ui/button'
import { FaArrowLeft } from 'react-icons/fa'

export default function NotFoundPage() {
  return (
    <aside className="flex flex-col gap-5 text-center">
      <h1 className="pt-5 text-3xl font-semibold tracking-tight first:mt-0 text-destructive">
        404 - Page Not Found
      </h1>
      <p className="text-destructive mb-10">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button className="w-50 mx-auto cursor-pointer">
        <FaArrowLeft />
        <Link to="/">Go back to Home</Link>
      </Button>
    </aside>
  )
}
