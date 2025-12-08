import adsData from "../../ads.json";

export interface AdItem {
    id: string;
    name: string;
    image_url: string;
    external_url: string;
}

const seenAds = new Set<string>();
const ads = adsData as AdItem[];

export function getRandomAd(): AdItem {
    if (ads.length === 0) {
        throw new Error("No ads available");
    }

    if (seenAds.size === ads.length) {
        seenAds.clear();
    }

    const remaining = ads.filter((ad) => !seenAds.has(ad.id));
    const ad = remaining[Math.floor(Math.random() * remaining.length)];
    seenAds.add(ad.id);

    return ad;
}

export function getRandomAds(count: number): AdItem[] {
    if (ads.length === 0 || count <= 0) {
        return [];
    }

    if (count >= ads.length) {
        return [...ads];
    }

    const shuffled = [...ads].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
