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

export function getStableAds(key: string, count: number): AdItem[] {
    if (ads.length === 0 || count <= 0) return [];
    const hash = Array.from(key || "default").reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) | 0, 0);
    const result: AdItem[] = [];
    const used = new Set<number>();
    for (let i = 0; i < Math.min(count, ads.length); i++) {
        const idx = Math.abs((hash + i * 1315423911) % ads.length);
        const pick = used.has(idx) ? (idx + i) % ads.length : idx;
        used.add(pick);
        result.push(ads[pick]);
    }
    return result;
}
