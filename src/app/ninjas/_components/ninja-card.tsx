import Image from "next/image";
import type { Character } from "../../../shared/types/characters";
import Link from "next/link";

type NinjaCardProps = Character

export const NinjaCard = (ninja: NinjaCardProps) => {

    return (
        <div
            key={ninja.id}
            className="group relative overflow-hidden rounded-xl bg-linear-to-b from-card/40 to-card/10 border border-orange-400/10 hover:border-orange-400/30 transition-all duration-500 backdrop-blur-sm"
        >
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-linear-to-r from-orange-400/0 via-orange-400/0 to-orange-400/0 group-hover:from-orange-400/10 group-hover:via-orange-400/10 group-hover:to-orange-400/10 transition-all duration-500"></div>

            {/* Image Container */}
            <div className={`relative h-80 overflow-hidden bg-linear-to-br  group-hover:scale-105 transition-transform duration-500 cursor-pointer`}>
                <Image
                    src={ninja.profile_image ?? "/placeholder.svg"}
                    alt={ninja.name}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    quality={75}
                    blurDataURL={ninja.profile_image ?? "/placeholder.svg"}
                    fill
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>

                {/* Floating Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm border border-orange-400/30 rounded-full">
                    <span className="text-xs font-semibold text-orange-400">{ninja.id}</span>
                </div>
            </div>

            {/* Content */}
            <div className="relative p-5 space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-orange-400 transition-colors duration-300 line-clamp-2">
                        {ninja.name}
                    </h3>
                    <p className="text-sm text-orange-400/70 font-medium">{ninja.rank}</p>
                </div>
                <p className="text-sm text-foreground/60 line-clamp-2">
                    {ninja.summary}
                </p>

                {/* Hover CTA */}
                <Link
                    href={`/ninjas/${ninja.id}`}
                    className="flex items-center gap-2 text-orange-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pt-2"
                    aria-label={`Ver detalhes de ${ninja.name}`}
                >
                    <span>Ver detalhes</span>
                    <svg
                        className="w-4 h-4"
                        role="img"
                        aria-labelledby={`ninja-${ninja.id}-details-title`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <title id={`ninja-${ninja.id}-details-title`}>Ver detalhes</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>

            {/* Bottom Border Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-orange-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </div>
    )
}