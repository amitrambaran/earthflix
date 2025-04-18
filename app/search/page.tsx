"use client";

import { useState } from "react";
import { searchMovies, Movie } from "../api/wookie";
import Image from "next/image";
import Link from "next/link";

function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = e.currentTarget.query.value as string;

    setIsLoading(true);
    setHasSearched(true);
    try {
      setResults(await searchMovies(query));
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            name="query"
            className="flex-1 p-3 rounded bg-gray-800"
            placeholder="Search movies..."
          />
          <button type="submit" className="px-6 py-3 bg-red-600 rounded">
            Search
          </button>
        </div>
      </form>

      {isLoading ? (
        <p className="text-center animate-pulse">Loading...</p>
      ) : hasSearched && results.length === 0 ? (
        <p className="text-center">No results found.</p>
      ) : (
        results.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((movie) => (
              <Link href={`/movie/${movie.slug}`} key={movie.id}>
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={200}
                  height={400}
                  className="rounded-lg"
                />
              </Link>
            ))}
          </div>
        )
      )}
    </main>
  );
}

export default Search;
