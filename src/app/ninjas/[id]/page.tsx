import { getNinjaById } from "@/services/ninja"
import type { NinjaRank } from "@/shared/enum/rank"
import { ninjaColorByRank } from "@/shared/hooks/colors"
import Link from "next/link"
import { HeroSection } from "./_components/hero-section"
import { JutsuSection } from "./_components/jutsu-section"
import { PowerSection } from "./_components/power-section"
import { NavigationSection } from "./_components/navigation-section"
import { ImageGallery } from "./_components/image-gallery"

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
                    <Link href="/ninjas" className="text-orange-500 hover:text-orange-400 transition">
                        Voltar para galeria
                    </Link>
                </div>
            </main>
        )
    }

    const rankColor = ninjaColorByRank(ninja.rank as NinjaRank)

    // Map rankColor to Tailwind background color classes
    const rankBgClassMap: Record<string, string> = {
        orange: "bg-orange-500/5",
        blue: "bg-blue-500/5",
        green: "bg-green-500/5",
        red: "bg-red-500/5",
        yellow: "bg-yellow-500/5",
        // Add other colors as needed
    }
    const rankBgClass = rankBgClassMap[rankColor] || "bg-gray-500/5"

    return (
        <main className="min-h-screen bg-background">

            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className={`absolute top-0 right-1/3 w-96 h-96 ${rankBgClass} rounded-full blur-3xl`}></div>
                <div className={`absolute bottom-20 left-1/4 w-80 h-80 ${rankBgClass} rounded-full blur-3xl`}></div>
            </div>

            {/* Hero Section */}
            <HeroSection ninja={ninja} />

            {/* Image Gallery */}

            {/* Jutsu Section */}
            <JutsuSection ninja={ninja} />

            {/* Power Stats Section */}
            <PowerSection ninja={ninja} />

            <ImageGallery ninja={ninja} />

            {/* Navigation Section */}
            <NavigationSection ninja={ninja} />
        </main>
    )
}