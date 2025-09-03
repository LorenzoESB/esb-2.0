import { getPageBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const page = await getPageBySlug((await params).slug);

    if (!page) {
        return {
            title: "Page Not Found",
        };
    }

    return {
        title: page.title.rendered.replace(/<[^>]*>/g, ""),
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const page = await getPageBySlug((await params).slug);

    if (!page) {
        notFound();
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8" dangerouslySetInnerHTML={{ __html: page.title.rendered }} />

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </main>
    );
}
