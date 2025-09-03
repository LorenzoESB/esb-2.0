"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, Search } from "lucide-react";

export default function Header() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;
        // Redireciona para a página do blog com query
        router.push(`/blog?search=${encodeURIComponent(query)}`);
    }

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-primary rounded-lg p-2">
                            <span className="text-primary-foreground font-bold text-xl">EB</span>
                        </div>
                        <div>
                            <h1 className="gradient-text text-xl font-bold">Educando Seu Bolso</h1>
                            <p className="text-muted-foreground text-xs">Educação financeira moderna</p>
                        </div>
                    </div>

                    {/* Search */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <form
                            onSubmit={handleSearch}
                            className="hidden sm:flex items-center space-x-2 bg-muted rounded-lg px-3 py-2"
                        >
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm text-foreground placeholder-muted-foreground"
                            />
                            <Button type="submit" variant="default" size="sm" className="hidden md:inline-flex">
                                <Search className="w-4 h-4 text-muted-foreground text-white" />
                            </Button>
                        </form>
                    </nav>

                    {/* Navigation and CTA */}
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-foreground hover:text-primary transition-colors duration-200">
                            Início
                        </Link>
                        <Link href="#blog" className="text-foreground hover:text-primary transition-colors duration-200">
                            Blog
                        </Link>
                        <Link href="#sobre" className="text-foreground hover:text-primary transition-colors duration-200">
                            Sobre
                        </Link>

                        <Button variant="default" size="sm" className="hidden md:inline-flex">
                            Começar agora
                        </Button>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
