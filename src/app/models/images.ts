import { User } from "./user";

export interface images {
    alt_description: string;
    blur_hash: string;
    color: string;
    created_at: string;
    description: string;
    heigh: number;
    id: string;
    liked_by_user: boolean;
    likes: number;
    updated_at: string;
    width: number;
    urls: {
        full:string;
        raw: string;
        regular: string;
        small: string;
        thumb: string;
    };
    links: {
        dowloand: string;
        dowloand_location: string;
        html: string;
        self: string;
    };
    promoted_at: string;
    user: User;
}