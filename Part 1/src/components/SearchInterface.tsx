import { useState, useEffect } from "react";
import { useLocalStorage, useDebounce } from "../hooks";
import Button from "./Button";

interface SearchResult {
  id: number;
  title: string;
}

const MOCK_DATA: SearchResult[] = [
  { id: 1, title: "react server components" },
  { id: 2, title: "typescript generics" },
  { id: 3, title: "react hooks" },
  { id: 4, title: "node streams" },
  { id: 5, title: "express rbac" },
  { id: 6, title: "debounce vs throttle" },
  { id: 7, title: "localstorage" },
  { id: 8, title: "jwt auth" },
];

function SearchInterface() {
  const [query, setQuery, clearQuery] = useLocalStorage("search:query", "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const filtered = MOCK_DATA.filter((item) =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setResults(filtered);
    setIsSearching(false);
  }, [debouncedQuery]);

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-900">Search</h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button variant="ghost" size="md" onClick={() => clearQuery()}>
          Clear
        </Button>
      </div>

      {isSearching && (
        <Button variant="primary" size="sm" isLoading>
          Searching
        </Button>
      )}

      {!isSearching && results.length > 0 && (
        <ul className="divide-y divide-gray-100 border border-gray-200 rounded-md overflow-hidden">
          {results.map((item) => (
            <li key={item.id} className="px-4 py-3 text-sm text-gray-800 hover:bg-gray-50">
              {item.title}
            </li>
          ))}
        </ul>
      )}

      {!isSearching && debouncedQuery && results.length === 0 && (
        <p className="text-sm text-gray-500">No results for "{debouncedQuery}".</p>
      )}
    </div>
  );
}

export default SearchInterface;