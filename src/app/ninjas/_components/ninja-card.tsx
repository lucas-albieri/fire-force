import Image from "next/image";
import type { Character } from "../../../shared/types/characters";

type NinjaCardProps = Character

export const NinjaCard = (ninja: NinjaCardProps) => {

    return <div>
        <Image src={ninja?.images[0].image_url ?? ''} alt={ninja.name} width={200} height={200} />
        <h2 className="text-xl font-bold">{ninja.name}</h2>
    </div>;
}