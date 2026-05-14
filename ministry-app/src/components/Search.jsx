function Search({ type, searchQuery, dispatch }) {
  return (
    <input
      className={`search ${type === "normal" ? "" : "search-ter"}`}
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => dispatch({ type: "query", payload: e.target.value })}
    />
  );
}

export default Search;
