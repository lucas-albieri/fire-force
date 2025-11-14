import type { Character } from "@/shared/types/characters"
import { client } from "./api"

export async function getNinjaById(id: number) {
    const response = await client.get(`characters/${id}`)
    return response.json<Character>()
}