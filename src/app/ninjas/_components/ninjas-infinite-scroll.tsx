'use client'

import { useEffect, useRef, useState } from 'react'
import { NinjaCard } from './ninja-card'
import type { Characters } from '@/shared/types/characters'

interface NinjasInfiniteScrollProps {
    initialNinjas: Characters
}

const ITEMS_PER_PAGE = 12

export function NinjasInfiniteScroll({ initialNinjas }: NinjasInfiniteScrollProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE)
    const [isLoading, setIsLoading] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadMoreRef = useRef<HTMLDivElement>(null)

    const filteredNinjas = initialNinjas.filter((ninja) =>
        ninja.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // biome-ignore lint/correctness/useExhaustiveDependencies: Only want to reset displayedCount when searchTerm changes, not on other state changes.
    useEffect(() => {
        // Reset displayedCount quando o filtro mudar
        setDisplayedCount(ITEMS_PER_PAGE)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if (first.isIntersecting && displayedCount < filteredNinjas.length) {
                    setIsLoading(true)
                    // Simula um pequeno delay para melhor UX
                    setTimeout(() => {
                        setDisplayedCount((prev) =>
                            Math.min(prev + ITEMS_PER_PAGE, filteredNinjas.length)
                        )
                        setIsLoading(false)
                    }, 300)
                }
            },
            { threshold: 0.1 }
        )

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current)
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [displayedCount, filteredNinjas.length])

    const displayedNinjas = filteredNinjas.slice(0, displayedCount)
    const hasMore = displayedCount < filteredNinjas.length

    return (
        <>
            <div className="w-full  mb-8">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Buscar shinobi pelo nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-4 bg-background/50 backdrop-blur-sm border border-orange-500/20 rounded-lg 
                                   text-foreground placeholder:text-foreground/40 
                                   focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50
                                   transition-all duration-300"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500/60" role="img" aria-labelledby="searchIconTitle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="false" focusable="false">
                            <title id="searchIconTitle">Buscar</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                {searchTerm && (
                    <p className="mt-3 text-sm text-foreground/60">
                        {filteredNinjas.length} {filteredNinjas.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                    </p>
                )}
            </div>

            {displayedNinjas.length === 0 ? (
                <div className="w-full text-center py-16">
                    <div className="text-orange-500/40 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <title>Nenhum resultado</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-lg text-foreground/60">Nenhum shinobi encontrado</p>
                    <p className="text-sm text-foreground/40 mt-2">Tente buscar com outro termo</p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedNinjas.map((ninja) => (
                        <li key={ninja.id} className="mb-4">
                            <NinjaCard {...ninja} />
                        </li>
                    ))}
                </ul>
            )}

            {hasMore && displayedNinjas.length > 0 && (
                <div
                    ref={loadMoreRef}
                    className="w-full flex justify-center py-8"
                >
                    {isLoading && (
                        <div className="flex items-center gap-2 text-orange-500">
                            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                            <span>Carregando mais shinobi...</span>
                        </div>
                    )}
                </div>
            )}

            {!hasMore && displayedNinjas.length > 0 && filteredNinjas.length > ITEMS_PER_PAGE && (
                <div className="w-full text-center py-8 text-foreground/60">
                    Todos os {filteredNinjas.length} shinobi foram carregados
                </div>
            )}
        </>
    )
}
