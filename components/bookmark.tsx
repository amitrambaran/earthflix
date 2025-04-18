"use client";

import { FiHeart } from "react-icons/fi";
import { useState, useEffect } from "react";

function BookmarkButton({ movieId }: { movieId: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const saved = localStorage?.getItem(`bookmark-${movieId}`);
    if (saved) {
      setIsBookmarked(saved === "true");
    }
  }, [movieId]);

  const toggleBookmark = () => {
    const toggledState = !isBookmarked;
    setIsBookmarked(toggledState);
    localStorage.setItem(`bookmark-${movieId}`, toggledState.toString());
  };

  return (
    <button onClick={toggleBookmark}>
      <FiHeart
        size={24}
        className={`ml-4 ${
          isBookmarked ? "fill-red-500 text-red-500" : "text-white"
        } `}
      />
    </button>
  );
}

export default BookmarkButton;
