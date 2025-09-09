import { FilterIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategories } from "@/lib/wordpress";

const FiltersBlog = async () => {
    const categories = await getCategories();
    return (
        <div className="col-start-1">
            <div className="pt-4">
                <div className="flex flex-row mt-3 pb-3">
                    <FilterIcon />
                    <h2>Categoria</h2>
                </div>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
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
