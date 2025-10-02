import Link from 'next/link';

export default function ArticleCard({ article }) {
  const { title, slug, coverImage, author, publishedAt } = article.attributes;
  const imageUrl = coverImage?.data?.attributes?.url;

  return (
    <Link href={`/articles/${slug}`}>
      <div className="border rounded overflow-hidden shadow hover:shadow-lg transition p-2">
        {imageUrl && <img src={`http://localhost:1337${imageUrl}`} alt={title} className="w-full h-48 object-cover" />}
        <h2 className="text-xl font-bold mt-2">{title}</h2>
        <p className="text-sm text-gray-500">{author.data.attributes.username} - {new Date(publishedAt).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}
