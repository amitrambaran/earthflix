const BASE_URL = "https://wookie.codesubmit.io/movies";
const AUTH_TOKEN = "Bearer Wookie2019";

export interface Movie {
  backdrop: string;
  cast: string[];
  classification: string;
  director: string;
  genres: string[];
  id: string;
  imdb_rating: number;
  length: string;
  overview: string;
  poster: string;
  released_on: string;
  slug: string;
  title: string;
}

export async function getAllMovies(): Promise<Movie[]> {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch from database");
  }

  const data = await response.json();
  return data?.movies;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to search database");
  }

  const data = await response.json();
  return data?.movies;
}
