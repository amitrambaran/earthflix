import Image from "next/image";
import { getAllMovies } from "@/app/api/wookie";
import { notFound } from "next/navigation";
import { FiStar } from "react-icons/fi";
import { FaImdb } from "react-icons/fa";
import BookmarkButton from "@/components/bookmark";

function StarRating({ rating }: { rating: number }) {
  const stars = Math.round((rating / 10) * 5);

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <FiStar
          key={index}
          className={
            index < stars ? "text-yellow-400 fill-yellow-400" : "text-white"
          }
          size={20}
        />
      ))}
    </div>
  );
}

export default async function MoviePage({
  params,
}: {
  params: { slug: string };
}) {
  const movies = await getAllMovies();
  const movie =
    movies?.find((movie) => movie.slug === params.slug) ?? notFound();

  return (
    <>
      <div className="relative w-full h-[400px]">
        <Image
          src={movie.backdrop}
          alt={movie.title}
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="container relative mx-auto max-w-4xl px-4 -mt-[150px]">
        <div className="flex gap-6">
          <div>
            <Image
              src={movie.poster}
              alt={movie.title}
              width={200}
              height={300}
              className="w-[200px] rounded-lg shadow-xl"
              priority={true}
            />
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              <p>
                {movie.released_on.split("-")[0]} | {movie.length} |{" "}
                {movie.director}
              </p>
              <p className="mt-2 text-sm">Cast: {movie.cast.join(", ")}</p>
            </div>
          </div>

          <aside>
            <h1 className="text-3xl font-bold">
              <div className="flex flex-wrap items-baseline gap-2">
                <span>{movie.title}</span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  ({movie.imdb_rating})
                  <FaImdb className="text-yellow-400" size={24} />
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <StarRating rating={movie.imdb_rating} />
                <BookmarkButton movieId={movie.id} />
              </div>
            </h1>
          </aside>
        </div>

        <p className="mt-6 text-sm leading-relaxed max-w-[600px]">
          {movie.overview}
        </p>
      </div>
    </>
  );
}
