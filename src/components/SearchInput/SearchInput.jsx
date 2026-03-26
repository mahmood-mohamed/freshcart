import { useEffect, useState } from "react";

export default function SearchInput({ onSearch }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(delay);
  }, [value]);

  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border p-2 rounded"
    />
  );
}
