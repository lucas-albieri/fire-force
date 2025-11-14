import type { Character } from "@/shared/types/characters"

type JutsuSectionProps = {
    ninja: Character
}

export function JutsuSection({ ninja }: JutsuSectionProps) {

    if (!ninja?.jutsus || ninja.jutsus.length === 0) {
        return null
    }

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 border-t border-orange-400/10">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-1 w-12 bg-linear-to-r from-orange-500 to-orange-400"></div>
                            <h2 className="text-2xl font-bold">Jutsus Especiais</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ninja.jutsus.map((jutsu) => (
                            <div
                                key={jutsu.id}
                                className="p-4 rounded-lg bg-linear-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 hover:border-orange-500/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                    <span className="font-medium text-foreground">{jutsu.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}