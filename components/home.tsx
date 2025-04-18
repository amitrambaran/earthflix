import { getAllMovies } from "../app/api/wookie";
import Carousel from "./carousel";

const Home = async () => {
  const movieList = await getAllMovies();
  const genreList = movieList.flatMap((movie) => movie.genres);
  const uniqueGenreList = [...new Set<string>(genreList)];
  console.log(uniqueGenreList);
  console.log(movieList);

  return (
    <main>
      <h1 className="flex justify-center p-8 text-3xl font-bold">WookieFlix</h1>
      {uniqueGenreList?.map((genre) => {
        return <Carousel key={genre} genre={genre} movieList={movieList} />;
      })}
    </main>
  );
};

export default Home;
