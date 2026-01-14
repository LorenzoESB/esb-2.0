declare const logger: {
    log: (msg: string) => void;
    error: (msg: string, err?: any) => void;
    warn: (msg: string) => void;
};
export declare const wpApi: import("axios").AxiosInstance;
export declare const strapiApi: import("axios").AxiosInstance;
export declare const DRY_RUN: boolean;
export declare function findInStrapi(collection: string, originalId: number): Promise<any>;
export declare function findInStrapiBySlug(collection: string, slug: string): Promise<any>;
export declare function createInStrapi(collection: string, data: any): Promise<any>;
export declare function updateInStrapi(collection: string, id: string | number, data: any): Promise<any>;
export declare function fetchAllWP<T>(endpoint: string): Promise<T[]>;
export { logger };
