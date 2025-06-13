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
    <section className="filter-section" role="region" aria-label="Filter Todos">
      <button
        onClick={() => setFilter('all')}
        disabled={current === 'all'}
        className="btn btn-active btn-primary"
      >
        All
      </button>
      <button
        className="btn btn-active btn-primary"
        onClick={() => setFilter('active')}
        disabled={current === 'active'}
      >
        Active
      </button>
      <button
        className="btn btn-active btn-primary"
        onClick={() => setFilter('completed')}
        disabled={current === 'completed'}
      >
        Completed
      </button>
    </section>
  )
}
