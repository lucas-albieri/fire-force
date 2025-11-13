
'use client'

import Link from "next/link"
import { Github } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-100 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-orange-400/20" : "bg-transparent"
                }`}
        >
            <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-80 "
                style={{
                    background: "linear-gradient(to right, #FF6A00 0%, #880101 100%) "

                }}
            />

            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="text-2xl font-bold text-transparent bg-clip-text transition-all duration-300"
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #FF6A00 0%, #FFD700 100%)',
                            }}
                        >
                            火
                        </div>
                    </div>
                    <span className="text-sm font-semibold text-orange-400 hidden sm:inline">Vontade do Fogo</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm font-semibold text-foreground/70 hover:text-orange-400 transition-colors duration-200 relative group underline-offset-4 hover:underline hover:decoration-orange-400"
                    >
                        Início

                    </Link>

                    {/* GitHub Link */}
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-fire-orange/10 text-foreground/70 hover:text-fire-gold transition-all duration-200 group"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    </a>
                </div>
            </nav>
        </header>
    )
}