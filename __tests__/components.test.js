import { render, screen, fireEvent } from "@testing-library/react";
import { Carousel } from "@/components/carousel";
import BookmarkButton from "@/components/bookmark";
import Search from "@/app/search/page";

const mockMovies = [
  {
    id: "1",
    title: "Test Movie",
    poster: "/test.jpg",
    backdrop: "/backdrop.jpg",
    slug: "test-movie",
    genres: ["Action"],
    imdb_rating: 8.5,
    length: "2h 30min",
    overview: "Test overview",
    released_on: "2024-01-01",
    cast: ["Actor 1", "Actor 2"],
    director: "Director Name",
  },
];

describe("Carousel Component", () => {
  it("should render movies of correct genre", () => {
    render(<Carousel genre="Action" movieList={mockMovies} />);
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByAltText("Test Movie")).toBeInTheDocument();
  });
});

describe("BookmarkButton Component", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should toggle bookmark state when clicked", () => {
    render(<BookmarkButton movieId="1" />);
    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(localStorage.getItem("bookmark-1")).toBe("true");

    fireEvent.click(button);
    expect(localStorage.getItem("bookmark-1")).toBe("false");
  });
});

describe("Search Component", () => {
  it("should show loading state during search", async () => {
    render(<Search />);
    const searchInput = screen.getByPlaceholderText("Search movies...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
