import { getNinjaById } from "@/services/ninja"
import type { NinjaRank } from "@/shared/enum/rank"
import { ninjaColorByRank } from "@/shared/hooks/colors"
import Link from "next/link"
import { HeroSection } from "./_components/hero-section"
import { JutsuSection } from "./_components/jutsu-section"
import { PowerSection } from "./_components/power-section"
import { NavigationSection } from "./_components/navigation-section"

type Props = {
    params: Promise<{ id: string }>
}

export default async function NinjaPage({ params }: Props) {

    const { id } = await params
    const ninja = await getNinjaById(+id)

    if (!ninja) {
        return (
            <main className="min-h-screen bg-background">
                <div className="pt-24 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-4">Ninja não encontrado</h1>
                    <Link href="/ninjas" className="text-fire-gold hover:text-fire-orange transition">
                        Voltar para galeria
                    </Link>
                </div>
            </main>
        )
    }

    const rankColor = ninjaColorByRank(ninja.rank as NinjaRank)

    return (
        <main className="min-h-screen bg-background">

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className={`absolute top-0 right-1/3 w-96 h-96 bg-${rankColor}/5 rounded-full blur-3xl`}></div>
                <div className={`absolute bottom-20 left-1/4 w-80 h-80 bg-${rankColor}/5 rounded-full blur-3xl`}></div>
            </div>

            {/* Hero Section */}
            <HeroSection ninja={ninja} rankColor={rankColor} />

            {/* Jutsu Section */}
            <JutsuSection ninja={ninja} />

            {/* Power Stats Section */}
            <PowerSection ninja={ninja} />

            {/* Navigation Section */}
            <NavigationSection ninja={ninja} />
        </main>
    )
}