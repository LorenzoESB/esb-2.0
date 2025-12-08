import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AdItem } from "@/lib/ads";

interface AdCardProps {
    ad: AdItem;
}

export function AdCard({ ad }: AdCardProps) {
    const imageSrc = ad.image_url.startsWith("./") ? ad.image_url.replace("./", "/") : ad.image_url;

    return (
        <Card className="h-full shadow-sm hover:shadow-md transition-shadow duration-200">
            <a href={ad.external_url} target="_blank" rel="noopener noreferrer">
                <CardContent className="p-4 rounded-xl bg-white flex items-center justify-center min-h-[10rem]">
                    <div className="relative w-full h-40 md:h-44">
                        <Image
                            src={imageSrc}
                            alt={ad.name}
                            fill
                            className="object-contain rounded-md"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                </CardContent>
            </a>
        </Card>
    );
}
