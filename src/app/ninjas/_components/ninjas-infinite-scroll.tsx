'use client'

import { useEffect, useState, useRef } from 'react'
import { NinjaCard } from './ninja-card'
import type { Characters } from '@/shared/types/characters'

interface NinjasInfiniteScrollProps {
    initialNinjas: Characters
}

const ITEMS_PER_PAGE = 12

export function NinjasInfiniteScroll({ initialNinjas }: NinjasInfiniteScrollProps) {
    const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE)
    const [isLoading, setIsLoading] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadMoreRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                const first = entries[0]
                if (first.isIntersecting && displayedCount < initialNinjas.length) {
                    setIsLoading(true)
                    // Simula um pequeno delay para melhor UX
                    setTimeout(() => {
                        setDisplayedCount((prev) =>
                            Math.min(prev + ITEMS_PER_PAGE, initialNinjas.length)
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
    }, [displayedCount, initialNinjas.length])

    const displayedNinjas = initialNinjas.slice(0, displayedCount)
    const hasMore = displayedCount < initialNinjas.length

    return (
        <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedNinjas.map((ninja) => (
                    <li key={ninja.id} className="mb-4">
                        <NinjaCard {...ninja} />
                    </li>
                ))}
            </ul>

            {hasMore && (
                <div
                    ref={loadMoreRef}
                    className="w-full flex justify-center py-8"
                >
                    {isLoading && (
                        <div className="flex items-center gap-2 text-orange-500">
                            <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                            <span>Carregando mais ninjas...</span>
                        </div>
                    )}
                </div>
            )}

            {!hasMore && displayedNinjas.length > 0 && (
                <div className="w-full text-center py-8 text-foreground/60">
                    Todos os {initialNinjas.length} ninjas foram carregados
                </div>
            )}
        </>
    )
}
