import type { Character } from "@/shared/types/characters"

type JutsuSectionProps = {
    ninja: Character
}

export function PowerSection({ ninja }: JutsuSectionProps) {

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 border-t border-fire-gold/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-12">
                    <div className="h-1 w-12 bg-linear-to-r from-fire-gold to-fire-orange"></div>
                    <h2 className="text-2xl font-bold">Nível de Poder</h2>
                </div>

                <div className="space-y-3 p-6 rounded-xl bg-card/40 border border-fire-gold/10 backdrop-blur-sm max-w-md">
                    <div className="flex items-center justify-between">
                        <span className="capitalize font-semibold text-sm text-fire-gold">Poder Total</span>
                        <span className="text-lg font-bold text-foreground">{ninja.power}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-card rounded-full h-3 overflow-hidden border border-fire-gold/10">
                        <div
                            className="h-full bg-linear-to-r from-fire-orange to-fire-red transition-all duration-500"
                            style={{ width: `${Math.min((ninja?.power / 100) * 100, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    )
}