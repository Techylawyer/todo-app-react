export default function SearchInput({ searchKeyword, onSearchChange }) {
  return (
    <section role="region" aria-label="Search Todos">
      <input
        type="text"
        placeholder="Search todos..."
        name="search-todo"
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </section>
  )
}