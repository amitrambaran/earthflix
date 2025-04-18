"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/app/api/wookie";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CarouselProps {
  genre: string;
  movieList: Movie[];
}

export const Carousel: React.FC<CarouselProps> = ({ genre, movieList }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) => {
    containerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="space-y-2 p-4" key={genre}>
      <h2 className="text-xl font-semibold">{genre}</h2>
      <div className="relative">
        <div
          className="flex space-x-4 overflow-x-auto snap-x snap-mandatory"
          ref={containerRef}
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "contain",
          }}
        >
          {movieList
            ?.filter((movie) => movie.genres.includes(genre))
            ?.map((movie) => (
              <Link href={`/movie/${movie.slug}`} key={movie.slug}>
                <div className="w-[200px] snap-start">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    width={200}
                    height={300}
                    className="rounded-lg cursor-pointer"
                  />
                </div>
              </Link>
            ))}
        </div>

        <button
          onClick={() => scroll(-400)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 rounded-full p-2"
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll(400)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 rounded-full p-2"
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
