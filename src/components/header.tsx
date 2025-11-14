
'use client'

import Link from "next/link"
import { Github } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {

    const links = [
        { href: "/", label: "Início" },
        { href: "/ninjas", label: "Ninjas" },
    ]

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
                <Link href="/" className="flex items-center gap-3 group relative">
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-orange-400 via-orange-500 to-orange-600 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="relative text-3xl font-sans text-transparent bg-clip-text bg-linear-to-br from-orange-300 via-orange-500 to-red-800 group-hover:from-orange-400 group-hover:to-orange-600 transition-all duration-500">
                            火
                        </div>
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="text-xs font-sans text-orange-400/70 tracking-widest uppercase">Shinobi</span>
                        <span className="text-sm font-bold text-orange-400 leading-none">Vontade do Fogo</span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-8">
                    {
                        links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-sans text-foreground/70 hover:text-orange-400 transition-colors duration-200 relative group underline-offset-4 hover:underline hover:decoration-orange-400"
                            >
                                {link.label}
                            </Link>
                        ))
                    }

                    {/* GitHub Link */}
                    <Link
                        href="https://github.com/lucas-albieri/fire-force"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-orange-400/10 text-foreground/70 hover:text-orange-400 transition-all duration-200 group"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    </Link>
                </div>
            </nav>
        </header>
    )
}