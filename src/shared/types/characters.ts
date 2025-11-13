export interface Character {
    id: number;
    name: string;
    father?: string;
    mother?: string;
    village?: string;
    rank?: string;
    power?: number;
    profile_image?: string;
    summary?: string;
    jutsus?: string[];
    images: {
        image_url: string;
        image_type: string;
        character_id: number;
        id: number;
    }[]
}

export type Characters = Character[];