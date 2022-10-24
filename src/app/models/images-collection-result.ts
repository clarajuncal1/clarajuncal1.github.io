export interface ImagesCollection<T> {
    total: number;
    total_pages: number;
    results: T[];
}