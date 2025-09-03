const API_URL = process.env.WORDPRESS_API_ADS_URL;


export async function getAllAdGroups(): Promise<any[]> {
    try {
        const res = await fetch(`${API_URL}/groups`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching ad groups:", error);
        return [];
    }
}

export async function getAdById(adId: string): Promise<any> {
    try {
        const res = await fetch(`${API_URL}/ad/${adId}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching ad by ID:", error);
        return null;
    }
}