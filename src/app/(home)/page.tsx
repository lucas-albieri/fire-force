import { getNinjas } from "../../services/ninjas";
import { NinjaCard } from "./_components/ninja-card";

export default async function Home() {

  const ninjas = await getNinjas()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Home</h1>
        <ul>
          {ninjas.map((ninja) => (
            <li key={ninja.id} className="mb-4">
              <NinjaCard {...ninja} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
