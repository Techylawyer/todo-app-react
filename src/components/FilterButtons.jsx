import SearchInput from './SearchInput'
import { Button } from '/components/ui/button'
import { useSearchParams } from 'react-router-dom'

export default function FilterButtons() {
  const [searchParams, setSearchParams] = useSearchParams()
  const current = searchParams.get('filter') || 'all'

  const setFilter = (filter) => {
    const next = new URLSearchParams(searchParams)
    next.set('filter', filter)
    setSearchParams(next)
  }

  return (
    <section
      className="filter-section flex gap-2 justify-center"
      role="region"
      aria-label="Filter Todos"
    >
      <Button
        onClick={() => setFilter('all')}
        disabled={current === 'all'}
        className="btn btn-active btn-primary"
      >
        All
      </Button>
      <Button
        className="btn btn-active btn-primary"
        onClick={() => setFilter('active')}
        disabled={current === 'active'}
      >
        Active
      </Button>
      <Button
        className="btn btn-active btn-primary"
        onClick={() => setFilter('completed')}
        disabled={current === 'completed'}
      >
        Completed
      </Button>
    </section>
  )
}
