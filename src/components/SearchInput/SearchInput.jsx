import { useEffect, useState } from "react";
import { Input, Button } from "@heroui/react";

export default function SearchInput({ onSearch, value: externalValue }) {
  const [value, setValue] = useState(externalValue || "");

  useEffect(() => {
    if (externalValue !== value) {
      setValue(externalValue || "");
    }
  }, [externalValue]);

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(delay);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-4">
      <Input
        aria-label="Search for products"
        type="text"
        placeholder="Search for products..."
        variant="bordered"
        radius="lg"
        size="lg"
        value={value}
        onValueChange={setValue}
        startContent={
          <div className="text-gray-400 px-2">
            <i className="fas fa-search"></i>
          </div>
        }
        endContent={
          value && (
            <Button
              isIconOnly
              variant="light"
              radius="full"
              size="sm"
              onPress={handleClear}
              className="text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times"></i>
            </Button>
          )
        }
        classNames={{
          inputWrapper: "bg-white shadow-sm border-gray-200 hover:border-green-500 focus-within:!border-green-500 transition-all px-1",
        }}
      />
    </div>
  );
}
