import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeleton() {
    return (
        <div>
            <article className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Navigation Skeleton */}
                <div className="mb-6 flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                </div>

                {/* Featured Image Skeleton */}
                <Skeleton className="w-full h-96 rounded-lg mb-8" />

                {/* Article Header Skeleton */}
                <header className="mb-8">
                    {/* Title Skeleton */}
                    <div className="mb-6 space-y-3">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-3/4" />
                    </div>

                    {/* Author and Meta Info Skeleton */}
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                        {/* Author Skeleton */}
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>

                        {/* Date and Reading Time Skeleton */}
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-4 w-20" />
                            <span className="text-gray-300">•</span>
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>

                    {/* Categories Skeleton */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <Skeleton className="h-6 w-32 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-28 rounded-full" />
                    </div>
                </header>

                {/* Article Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Content Column Skeleton */}
                    <div className="lg:col-span-8">
                        <div className="space-y-6">
                            {/* Paragraph Skeletons */}
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>

                            {/* Image Placeholder in Content */}
                            <Skeleton className="h-48 w-full rounded-lg" />

                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>

                            {/* Quote or Highlight Skeleton */}
                            <div className="border-l-4 border-primary/20 pl-4 py-2">
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-3/4 mt-2" />
                            </div>

                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 h-fit">
                        {/* Sponsor Space 1 Skeleton */}
                        <Card className="animate-pulse">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <Skeleton className="w-full h-32 rounded-lg mb-3" />
                                    <Skeleton className="h-3 w-20 mx-auto" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Newsletter Skeleton */}
                        <Card className="animate-pulse">
                            <CardContent className="p-4">
                                <Skeleton className="h-5 w-24 mb-2" />
                                <Skeleton className="h-4 w-full mb-3" />
                                <div className="space-y-2">
                                    <Skeleton className="h-9 w-full rounded-md" />
                                    <Skeleton className="h-8 w-full rounded-md" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sponsor Space 2 Skeleton */}
                        <Card className="animate-pulse">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <Skeleton className="w-full h-40 rounded-lg mb-3" />
                                    <Skeleton className="h-3 w-24 mx-auto" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Tools Skeleton */}
                        <Card className="animate-pulse">
                            <CardContent className="p-4">
                                <Skeleton className="h-5 w-32 mb-3" />
                                <div className="space-y-2">
                                    <Skeleton className="h-10 w-full rounded-md" />
                                    <Skeleton className="h-10 w-full rounded-md" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sponsor Space 3 - Banner Skeleton */}
                        <Card className="animate-pulse">
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <Skeleton className="w-full h-24 rounded-lg mb-2" />
                                    <Skeleton className="h-3 w-20 mx-auto" />
                                </div>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </article>
        </div>
    );
}
