import { getNinjas } from "@/services/ninjas"
import { NinjaCard } from "./_components/ninja-card"

export default async function Ninjas() {

    const ninjas = await getNinjas()

    return (
        <main className="flex min-h-screen w-full px-40 flex-col items-center justify-between py-32 sm:items-start">

            <div className="max-w-7xl  mb-16">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-1 w-12 bg-linear-to-r from-orange-400 to-orange-500"></div>
                    <span className="text-orange-500/80 font-light tracking-widest uppercase text-sm">Galeria de Shinobi</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-orange-500 to-red-500">
                        Guerreiros Lendários
                    </span>
                </h1>

                <p className="text-lg text-foreground/60 max-w-2xl">
                    Conheça os shinobi mais poderosos que moldaram o destino do mundo ninja!
                </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6  ">
                {ninjas.map((ninja) => (
                    <li key={ninja.id} className="mb-4">
                        <NinjaCard {...ninja} />
                    </li>
                ))}
            </ul>
        </main>
    )
}