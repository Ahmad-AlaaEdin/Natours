import { Filter } from "lucide-react";

interface FilterBarProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function FilterBar({
  selectedFilter,
  onFilterChange,
}: FilterBarProps) {
  const filters = ["All Tours", "Easy", "Medium", "Difficult"];

  return (
    <div className="mb-8 sm:mb-12">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2" style={{ color: "#3d3a3b" }}>
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter
                  ? "text-white shadow-lg"
                  : "bg-white hover:bg-[#edebe0] border"
              }`}
              style={
                selectedFilter === filter
                  ? {
                      background:
                        "linear-gradient(135deg, #428177 0%, #054239 100%)",
                      boxShadow: "0 4px 14px 0 rgba(66, 129, 119, 0.4)",
                    }
                  : {
                      color: "#3d3a3b",
                      borderColor: "#b9a779",
                    }
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
