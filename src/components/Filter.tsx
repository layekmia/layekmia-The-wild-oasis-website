"use client";

import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  { label: "All Cabins", value: "all" },
  { label: "1—3 guests", value: "small" },
  { label: "4—10 guests", value: "medium" },
  { label: "10—20 guests", value: "large" },
];

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("capacity") || "all";

  const handleFilter = (capacity: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("capacity", capacity);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-end mb-8">
      <div className="border border-primary-800 flex flex-col md:flex-row rounded-lg overflow-hidden">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleFilter(value)}
            className={`px-5 py-2 transition-colors cursor-pointer
          ${
            active === value
              ? "bg-gradient-to-r from-accent-500 to-accent-700 text-white"
              : "bg-primary-900 text-primary-200 hover:bg-gradient-to-r hover:from-accent-500 hover:to-accent-700 hover:text-white"
          }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
