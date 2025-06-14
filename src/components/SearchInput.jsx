import { Input } from '/components/ui/input'

export default function SearchInput({ searchKeyword, onSearchChange }) {
  return (
    <section role="region" aria-label="Search Todos">
      <Input
        className="rounded-full"
        type="text"
        placeholder="Search todos..."
        name="search-todo"
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </section>
  )
}
