import type { Character } from "@/shared/types/characters";
import Link from "next/link";

export function NavigationSection({ ninja }: { ninja: Character }) {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 border-t border-orange-400/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {ninja.id > 1 && (
                        <Link
                            href={`/ninjas/${ninja.id - 1}`}
                            className="px-6 py-3 rounded-lg bg-linear-to-r from-orange-400 to-orange-500 text-foreground font-semibold hover:shadow-lg hover:shadow-orange-400/50 transition-all duration-300"
                        >
                            Ninja Anterior
                        </Link>
                    )}

                    <Link
                        href="/ninjas"
                        className="px-6 py-3 rounded-lg border border-orange-400/30 text-orange-400 font-semibold hover:bg-orange-400/10 transition-all duration-300"
                    >
                        Ver Todos
                    </Link>

                    <Link
                        href={`/ninjas/${ninja.id + 1}`}
                        className="px-6 py-3 rounded-lg bg-linear-to-r from-orange-400 to-orange-500  font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                    >
                        Próximo Ninja
                    </Link>
                </div>
            </div>
        </section>
    )
}