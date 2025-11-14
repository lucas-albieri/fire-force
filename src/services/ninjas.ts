'use cache'

import type { Characters } from "../shared/types/characters";
import { client } from "./api";

export async function getNinjas() {
    const response = await client.get('characters')
    const data = await response.json<Characters>()
    return data.sort((a, b) => a.id - b.id)
}