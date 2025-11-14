'use cache'

import type { Character } from "@/shared/types/characters"
import { client } from "./api"

export async function getNinjaById(id: number) {
    try {
        const response = await client.get(`characters/${id}`)
        return response.json<Character>()
    } catch (error) {
        console.error(`Failed to fetch ninja with id ${id}:`, error)
        return null
    }
}