export interface User {
    accepted_tos: boolean;
    bio: string; 
    first_name: string;
    for_hire: boolean;
    id: string;
    instagram_username: string;
    last_name: string;
    links: {
        followers: string;
        following: string;
        html: string;
        likes: string;
        photos: string;
        portfolio: string;
        self: string;
    };
    location: string;
    name: string;
    profile_image: {
        small: string;
        medium: string;
        large: string;
    };
    social: {};
    portfolio: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    twitter_username: string;
    updated_at: string;
    username: string;
    followers_count: number;
    following_count: number;
    downloads: number;
}