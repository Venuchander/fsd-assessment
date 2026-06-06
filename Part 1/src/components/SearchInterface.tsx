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
  { id: 9, title: "vite build optimization" },
  { id: 10, title: "css container queries" },
];

function SearchInterface() {
  const [query, setQuery, clearQuery] = useLocalStorage("search:query", "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    const timeout = setTimeout(() => {
      setResults(
        MOCK_DATA.filter((item) =>
          item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      );
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">

        <h1 className="text-white text-2xl font-semibold tracking-tight text-center mb-6">
          Search
        </h1>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600"
              width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-600 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-neutral-600 transition-all"
            />
          </div>
          {query && (
            <Button variant="ghost" size="md" onClick={() => clearQuery()}>
              Clear
            </Button>
          )}
        </div>

        <div className="mt-1.5 h-5 flex items-center px-1">
          {isSearching && (
            <Button variant="ghost" size="sm" isLoading>
              Searching
            </Button>
          )}
          {!isSearching && debouncedQuery && (
            <span className="text-xs text-neutral-600">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {!isSearching && results.length > 0 && (
          <ul className="mt-2 border border-neutral-800 rounded-xl overflow-hidden divide-y divide-neutral-800/60">
            {results.map((item) => (
              <li
                key={item.id}
                className="px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}

        {!isSearching && debouncedQuery && results.length === 0 && (
          <p className="mt-4 text-center text-sm text-neutral-600">
            No results for "{debouncedQuery}"
          </p>
        )}

      </div>
    </div>
  );
}

export default SearchInterface;