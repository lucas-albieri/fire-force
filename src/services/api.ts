import ky from "ky";

export const client = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});