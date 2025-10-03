import { fetchArticles } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";

export default async function HomePage() {
  const articles = await fetchArticles();

  if (!articles || articles.length === 0) {
    return (
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Articles publiés</h1>
        <p>Aucun article publié pour le moment.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Articles publiés</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}




