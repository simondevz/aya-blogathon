"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");

  return (
    <span className="flex justify-between gap-2 py-2">
      <input
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="hidden"
      />
      <FaSearch />
    </span>
  );
}
