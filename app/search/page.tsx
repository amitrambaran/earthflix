const Search = () => {
  return (
    <div className="flex flex-col justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Search for Earthtainment</h1>
      <input
        type="text"
        placeholder="Movies, TV shows..."
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default Search;
