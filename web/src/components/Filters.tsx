"use client";

interface FiltersBlogProps {
    categories: Array<{ id: number; name: string; slug: string }>;
    selectedCategory?: string;
    onSelect: (slug: string | null) => void;
}

export default function FiltersBlog({ categories, selectedCategory, onSelect }: FiltersBlogProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Categorias</span>
                <span className="text-xs text-muted-foreground">Filtre os conteúdos por tema</span>
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onSelect(null)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                        !selectedCategory
                            ? "bg-primary text-primary-foreground shadow"
                            : "bg-muted text-foreground hover:bg-primary/10"
                    }`}
                >
                    Todas
                </button>
                {categories.map((category) => {
                    const isActive = selectedCategory === category.slug;
                    return (
                        <button
                            key={category.id}
                            onClick={() => onSelect(category.slug)}
                            className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                                isActive
                                    ? "bg-primary text-primary-foreground shadow"
                                    : "bg-muted text-foreground hover:bg-primary/10"
                            }`}
                        >
                            {category.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
