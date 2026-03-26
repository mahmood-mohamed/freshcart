export default function FiltersBar({ setFilters, resetFilters }) {
  return (
    <div className="flex flex-wrap gap-3">
      
      <input
        type="number"
        placeholder="Min"
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            minPrice: e.target.value,
          }))
        }
        className="border p-2 rounded w-24"
      />

      <input
        type="number"
        placeholder="Max"
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            maxPrice: e.target.value,
          }))
        }
        className="border p-2 rounded w-24"
      />

      <select
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            sort: e.target.value,
          }))
        }
        className="border p-2 rounded"
      >
        <option value="">Default</option>
        <option value="price">Low → High</option>
        <option value="-price">High → Low</option>
      </select>

      <button onClick={resetFilters}>Reset</button>
    </div>
  );
}
