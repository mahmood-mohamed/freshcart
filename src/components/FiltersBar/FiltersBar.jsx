import { Input, Select, SelectItem, Button } from "@heroui/react";

export default function FiltersBar({ filters, setFilters, resetFilters }) {
  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
  ];

  const handleSelectionChange = (keys) => {
    const selectedValue = Array.from(keys)[0] || "";
    setFilters((prev) => prev.sort === selectedValue ? prev : ({ ...prev, sort: selectedValue }));
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-2 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-2">
        <Input
          aria-label="Minimum Price"
          type="number"
          min={0}
          placeholder="Min Price"
          labelPlacement="outside"
          startContent={<span className="text-gray-400 text-sm">EGP</span>}
          value={filters.minPrice}
          onValueChange={(val) => setFilters(prev => prev.minPrice === val ? prev : ({ ...prev, minPrice: val }))}
          className="w-32"
          variant="flat"
          radius="lg"
        />
        <span className="text-gray-300">—</span>
        <Input
          aria-label="Maximum Price"
          type="number"
          min={0}
          placeholder="Max Price"
          labelPlacement="outside"
          startContent={<span className="text-gray-400 text-sm">EGP</span>}
          value={filters.maxPrice}
          onValueChange={(val) => setFilters(prev => prev.maxPrice === val ? prev : ({ ...prev, maxPrice: val }))}
          className="w-32"
          variant="flat"
          radius="lg"
        />
      </div>

      <div className="w-40 md:w-48 ">
        <Select
          aria-label="Sort products"
          placeholder="Sort by"
          variant="flat"
          radius="lg"
          selectedKeys={new Set(filters.sort ? [filters.sort] : [])}
          onSelectionChange={handleSelectionChange}
          disallowEmptySelection={false}
        >
          {sortOptions.map((option) => (
            <SelectItem key={option.value} textValue={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Button
        variant="flat"
        color="danger"
        radius="lg"
        onPress={resetFilters}
        startContent={<i className="fas fa-trash-alt"></i>}
        className="font-medium"
      >
        Clear Filters
      </Button>
    </div>
  );
}
