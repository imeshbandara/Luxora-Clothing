import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className='hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 dark:ring-zinc-800 px-2 py-1 shadow-md bg-white dark:bg-zinc-900'>
      <Search className="w-4 h-4 text-gray-500 dark:text-zinc-400"/>
      <input id="search" placeholder="Search..." className="text-sm outline-0 text-zinc-900 dark:text-zinc-100 bg-transparent"/>
    </div>
  )
}

export default SearchBar