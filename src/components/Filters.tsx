import { FilterIcon, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/lib/wordpress";

const FiltersBlog = async () => {
  const categories = await getCategories();
  return (
    <div className="col-start-1">
      <div>
        <form
          //   onSubmit={handleSearch}
          className="hidden sm:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2"
        >
          <input
            type="text"
            placeholder="Buscar..."
            // value={query}
            // onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-foreground placeholder-muted-foreground"
          />
        </form>
      </div>
      <div>
        <div className="flex flex-row mt-3">
          <FilterIcon />
          <h2>Categoria</h2>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categoria...</SelectLabel>
              {categories.map((category: any) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FiltersBlog;
