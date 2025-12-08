import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link"; // Import Next.js Link

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    searchQuery?: string;
    onPageChange?: (page: number) => void;
}

export function PaginationPosts({ currentPage, totalPages, searchQuery = "", onPageChange }: PaginationProps) {
    const getPageLink = (page: number) => {
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        params.set("page", page.toString());
        return `?${params.toString()}`;
    };

    const pagesToShow = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
    }

    return (
        <div className="flex justify-center mt-8">
            <Pagination>
                <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                        {currentPage > 1 ? (
                            onPageChange ? (
                                <button
                                    onClick={() => onPageChange(currentPage - 1)}
                                    className="px-3 py-2 rounded-md border hover:bg-muted"
                                >
                                    Anterior
                                </button>
                            ) : (
                            <PaginationPrevious href={getPageLink(currentPage - 1)} />
                            )
                        ) : (
                            <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                        )}
                    </PaginationItem>

                    {/* Start Ellipsis */}
                    {startPage > 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {/* Dynamic Page Links */}
                    {pagesToShow.map((page) => (
                        <PaginationItem key={page}>
                            {onPageChange ? (
                                <button
                                    onClick={() => onPageChange(page)}
                                    className={`px-3 py-2 rounded-md border ${
                                        page === currentPage ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                    }`}
                                >
                                    {page}
                                </button>
                            ) : (
                                <PaginationLink href={getPageLink(page)} isActive={page === currentPage}>
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* End Ellipsis */}
                    {endPage < totalPages && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {/* Next Button */}
                    <PaginationItem>
                        {currentPage < totalPages ? (
                            onPageChange ? (
                                <button
                                    onClick={() => onPageChange(currentPage + 1)}
                                    className="px-3 py-2 rounded-md border hover:bg-muted"
                                >
                                    Próxima
                                </button>
                            ) : (
                            <PaginationNext href={getPageLink(currentPage + 1)} />
                            )
                        ) : (
                            <PaginationNext href="#" className="pointer-events-none opacity-50" />
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
