import { fetchArticles } from '../lib/api';
import ArticleCard from '../components/ArticleCard';

export default function Home({ articles }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const articles = await fetchArticles();
  return { props: { articles }, revalidate: 60 };
}
