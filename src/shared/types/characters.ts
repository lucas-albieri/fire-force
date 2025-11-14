export interface Character {
    id: number;
    name: string;
    father?: {
        id: number;
        name: string;
    }
    mother?: {
        id: number;
        name: string;
    }
    village?: {
        id: number;
        name: string;
    }
    rank?: string;
    power?: number;
    profile_image?: string;
    summary?: string;
    jutsus?: {
        id: number;
        description: string;
        name: string;
        type: string;
        power: number;
    }[]
    images: {
        image_url: string;
        image_type: string;
        character_id: number;
        id: number;
    }[]
}

export type Characters = Character[];