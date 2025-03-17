export default function FilterSearch({
  search,
  setSearch,
  category,
  setCategories,
  ingredients,
  setIngredients,
  allCategories,
  allIngredients
}) {
  return (
    <div className="search-input-container">
      <input
        placeholder="Search by category or ingredient..."
        onChange={e => setSearch(e.target.value)}
        value={search}
        className="search-input"
      />
      <select
        onChange={e => setCategories(e.target.value)}
        value={category}
        className="filter-select"
      >
        {allCategories.map(item =>
          <option key={item} value={item}>
            {item}
          </option>
        )}
      </select>
      <select
        onChange={e => setIngredients(e.target.value)}
        value={ingredients}
        className="filter-select"
      >
        {allIngredients.map(item =>
          <option key={item} value={item}>
            {item}
          </option>
        )}
      </select>
    </div>
  );
}
