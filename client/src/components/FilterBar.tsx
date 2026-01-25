import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  sortOption: string;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  sortOption,
  onSortChange,
}: FilterBarProps) {
  const sortLabels: Record<string, string> = {
    price: "Price: Low to High",
    "-price": "Price: High to Low",
    "-ratingsAverage": "Highest Rated",
    ratingsAverage: "Lowest Rated",
  };

  return (
    <div className="mb-8 sm:mb-6 flex justify-end">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-brand-dark">Sort by:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 border-brand-secondary text-brand-dark hover:bg-brand-accent"
            >
              {sortLabels[sortOption] || "Select"}
              <ArrowUpDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuItem onClick={() => onSortChange("price")}>
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("-price")}>
              Price: High to Low
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("-ratingsAverage")}>
              Highest Rated
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("ratingsAverage")}>
              Lowest Rated
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
