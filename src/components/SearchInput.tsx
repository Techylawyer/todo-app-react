import { Input } from '@/components/ui/input'

type SearchInputProps = {
  searchKeyword: string
  onSearchChange: (value: string) => void
}

export default function SearchInput({ searchKeyword, onSearchChange }: SearchInputProps) {
  return (
    <section role="region" aria-label="Search Todos">
      <Input
        className="rounded-full"
        type="text"
        placeholder="Search todos..."
        name="search-todo"
        value={searchKeyword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
      />
    </section>
  )
}
