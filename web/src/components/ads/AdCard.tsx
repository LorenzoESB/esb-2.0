import { AdItem } from "@/lib/ads";

interface AdCardProps {
    ad: AdItem;
}

export function AdCard({ ad }: AdCardProps) {
    const imageSrc = ad.image_url.startsWith("./") ? ad.image_url.replace("./", "/") : ad.image_url;

    return (
        <div className="ad-container">
            <a href={ad.external_url} target="_blank" rel="noopener noreferrer" className="block w-full">
                <img
                    src={imageSrc}
                    alt={ad.name}
                    className="block max-w-full h-auto"
                    loading="lazy"
                    decoding="async"
                />
            </a>
        </div>
    );
}
