import PostCard from "@/components/Posts";
import { WordpressPost } from "@/types/wordpress";

interface LatestArticlesProps {
  posts: WordpressPost[];
}

export default function LatestArticles({ posts }: LatestArticlesProps) {
  const safePosts = posts ?? [];

  if (safePosts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="text-center lg:text-left">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
          Veja os artigos mais recentes
        </h2>
        <p className="text-base text-muted-foreground">
          Conteúdo especializado para você ficar por dentro das tendências do mercado financeiro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 grid-flow-dense">
        {safePosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}
