import type { Character } from "@/shared/types/characters";
import Image from "next/image";
import Link from "next/link";

type Props = {
    ninja: Character
    rankColor: string
}

export function HeroSection({ ninja, rankColor }: Props) {
    return (
        <section className="relative pt-20 pb-12 px-4 md:px-8 lg:px-16">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-sm text-foreground/60">
                    <Link href="/" className="hover:text-orange-400 transition">Início</Link>
                    <span>/</span>
                    <Link href="/ninjas" className="hover:text-orange-400 transition">Ninjas</Link>
                    <span>/</span>
                    <span className="text-orange-400">{ninja.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className={`relative rounded-2xl overflow-hidden h-96 md:h-full min-h-96 bg-linear-to-br from-${rankColor} to-${rankColor}/50 group`}>
                            <Image
                                src={ninja.images[0].image_url || "/placeholder.svg"}
                                alt={ninja.name}
                                className="w-full h-full object-cover opacity-90"
                                fill
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>

                            {/* Number Badge */}
                            <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center border-2 border-orange-400/30">
                                <span className="text-2xl font-bold text-foreground">{ninja.id}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Side */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-1 w-12 bg-linear-to-r from-orange-400 to-orange-500"></div>
                                <span className="text-orange-400/80 font-light tracking-widest uppercase text-sm">{ninja.rank || 'Desconhecido'}</span>
                            </div>

                            <h1 className="text-5xl font-bold text-balance text-foreground">
                                {ninja.name}
                            </h1>

                            <p className="text-lg text-foreground/70">
                                {ninja.summary || 'Nenhuma descrição disponível'}
                            </p>
                        </div>

                        {/* Background */}
                        <div className="p-6 rounded-xl bg-card/10 border border-orange-400/20 backdrop-blur-sm space-y-3">
                            <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Informações</h3>
                            <div className="text-foreground/80 leading-relaxed space-y-2">
                                {ninja.village && <p><strong>Vila:</strong> {ninja.village.name}</p>}
                                {ninja.father && <p><strong>Pai:</strong> {ninja.father.name}</p>}
                                {ninja.mother && <p><strong>Mãe:</strong> {ninja.mother.name}</p>}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-orange-400/10 border border-orange-400/20">
                                <div className="text-2xl font-bold text-orange-400">{ninja.jutsus?.length || 0}</div>
                                <div className="text-sm text-foreground/70">Jutsus</div>
                            </div>
                            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <div className="text-2xl font-bold text-orange-500">{ninja.images?.length || 0}</div>
                                <div className="text-sm text-foreground/70">Imagens</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}