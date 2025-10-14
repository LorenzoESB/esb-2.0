import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { getAuthor, getFeaturedImage, getPostCategories } from "@/lib/api/wordpress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
    post: any;
    index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
    const featuredImage = getFeaturedImage(post);
    const author = getAuthor(post);
    const categories = getPostCategories(post);
    const postDate = new Date(post.date).toLocaleDateString("pt-BR");
    return (
        <Link href={`/blog/${post.slug}`} key={post.id}>
            <Card
                className="group hover:shadow-custom-lg transition-all duration-300 hover:scale-105 bg-card border-border/50 overflow-hidden animate-scale-in cursor-pointer py-0 h-125"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="relative overflow-hidden">
                    {featuredImage ? (
                        <img
                            src={featuredImage.url}
                            alt={featuredImage.alt || post.title.rendered}
                            className="w-full h-58 object-cover group-hover:scale-110 transition-transform duration-500 "
                        />
                    ) : (
                        <div className="w-full h-58 bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">Sem imagem</span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            {categories[0]?.name || "Sem categoria"}
                        </Badge>
                    </div>
                </div>

                <CardHeader className="pb-1">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                    <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
                        <span dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    </CardDescription>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{postDate}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/30 pb-2">
                        <div className="flex items-center space-x-2 ">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                                {author?.name || "Autor desconhecido"}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:text-primary transition-colors duration-300"
                        >
                            Ler mais
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
