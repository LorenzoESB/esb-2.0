"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Menu, Search, X } from "lucide-react";

export default function Header() {
    const [query, setQuery] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const router = useRouter();

    function handleSearch() {
        if (!query.trim()) return;
        router.push(`/blog?search=${encodeURIComponent(query)}`);
        setIsMobileSearchOpen(false);
    }

    function handleKeyPress(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsMobileSearchOpen(false);
    }

    function toggleMobileSearch() {
        setIsMobileSearchOpen(!isMobileSearchOpen);
        setIsMobileMenuOpen(false);
    }

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Responsivo */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Link href={"/"} className="flex items-center space-x-2">
                            <div className="rounded-lg p-1 md:p-2">
                                <div className="w-8 h-8 md:w-[70px] md:h-[70px] rounded-lg flex items-center justify-center">
                                    <Image src="/bolsito_new.svg" alt="Logo" width={70} height={70} />
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="gradient-text text-lg md:text-xl font-bold">Educando Seu Bolso</h1>
                                <p className="text-muted-foreground text-xs hidden md:block">Educação financeira moderna</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="bg-transparent border-none outline-none text-sm text-foreground placeholder-muted-foreground w-48"
                            />
                            <Button onClick={handleSearch} variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary">
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </nav>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center space-x-6 font-bold">
                        <Link href={"/blog"} className="text-primary hover:text-accent transition-colors">
                            Todos os Artigos
                        </Link>
                        <Link href={"/rankings"} className="text-primary hover:text-accent transition-colors">
                            Rankings
                        </Link>
                        <Link href={"/simuladores"} className="text-primary hover:text-accent transition-colors">
                            Simuladores
                        </Link>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center space-x-2 lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileSearch}
                            className="h-9 w-9 focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                            className="h-9 w-9 focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {isMobileSearchOpen && (
                    <div className="lg:hidden border-t border-border/50 py-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground border-none outline-none"
                                autoFocus
                            />
                            <Button onClick={handleSearch} variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary">
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-border/50 py-4">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href={"/rankings"}
                                className="font-bold text-lg text-primary hover:text-accent transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Rankings
                            </Link>
                            <Link
                                href={"/blog"}
                                className="font-bold text-lg text-primary hover:text-accent transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href={"/simuladores"}
                                className="font-bold text-lg text-primary hover:text-accent transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Simuladores
                            </Link>
                            <div className="pt-2 border-t border-border/20">
                                <p className="text-sm text-muted-foreground">Educação financeira moderna</p>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
