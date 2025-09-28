const API_URL = process.env.WORDPRESS_API_ADS_URL;


export async function getAllAds(): Promise<any[]> {
    try {
        const res = await fetch(`${API_URL}/ads`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching ad groups:", error);
        return [];
    }
}