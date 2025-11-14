import type { Character } from "@/shared/types/characters";
import Link from "next/link";

export function NavigationSection({ ninja }: { ninja: Character }) {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 border-t border-fire-gold/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {ninja.id > 1 && (
                        <Link
                            href={`/ninjas/${ninja.id - 1}`}
                            className="px-6 py-3 rounded-lg bg-linear-to-r from-fire-orange to-fire-red text-foreground font-semibold hover:shadow-lg hover:shadow-fire-orange/50 transition-all duration-300"
                        >
                            Ninja Anterior
                        </Link>
                    )}

                    <Link
                        href="/ninjas"
                        className="px-6 py-3 rounded-lg border border-fire-gold/30 text-fire-gold font-semibold hover:bg-fire-gold/10 transition-all duration-300"
                    >
                        Ver Todos
                    </Link>

                    <Link
                        href={`/ninjas/${ninja.id + 1}`}
                        className="px-6 py-3 rounded-lg bg-linear-to-r from-fire-red to-fire-orange text-foreground font-semibold hover:shadow-lg hover:shadow-fire-red/50 transition-all duration-300"
                    >
                        Próximo Ninja
                    </Link>
                </div>
            </div>
        </section>
    )
}