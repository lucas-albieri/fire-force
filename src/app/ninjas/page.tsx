import { getNinjas } from "@/services/ninjas"
import { NinjaCard } from "./_components/ninja-card"

export default async function Ninjas() {

    const ninjas = await getNinjas()

    return (
        <main className="flex min-h-screen w-full px-40 flex-col items-center justify-between py-32 sm:items-start">
            <ul className="w-full grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-6  ">
                {ninjas.map((ninja) => (
                    <li key={ninja.id} className="mb-4">
                        <NinjaCard {...ninja} />
                    </li>
                ))}
            </ul>
        </main>
    )
}