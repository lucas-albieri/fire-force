import type { Characters } from "../shared/types/characters";
import { client } from "./api";

export async function getNinjas() {
    const response = await client.get('characters');
    return response.json<Characters>()
}