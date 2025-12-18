"use client";
import { ListSermonsParams } from "@/interfaces/sermon.interface";
import { SearchIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SermonFiltersProps {
  onFilterChange: (filters: Partial<ListSermonsParams>) => void;
  initialFilters?: Partial<ListSermonsParams>;
}

const SermonFilters = ({
  onFilterChange,
  initialFilters,
}: SermonFiltersProps) => {
  const [search, setSearch] = useState(initialFilters?.search || "");
  const [tags, setTags] = useState(initialFilters?.tags || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        search: search || undefined,
        tags: tags || undefined,
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, tags, onFilterChange]);

  const handleReset = () => {
    setSearch("");
    setTags("");
    onFilterChange({});
  };

  const hasActiveFilters = search || tags;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search sermons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {hasActiveFilters && (
          <Button variant="outline" onClick={handleReset}>
            <X className="w-4 h-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default SermonFilters;
