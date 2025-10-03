import Link from "next/link";

export default function ArticleCard({ article }) {
  const { title, slug, publishedAt, coverImage, author } = article;

  const imageUrl = article.coverImage?.data?.attributes?.url
  ? `${process.env.URL}${article.coverImage.data.attributes.url}`
  : "/placeholder.png";

  return (
    <Link href={`/articles/${slug}`}>
      <div className="rounded shadow p-4 bg-white cursor-pointer hover:shadow-lg transition">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded"
        />
        <h2 className="text-lg font-bold mt-2">{title}</h2>
        <p className="text-sm text-gray-500">
          {author?.data?.attributes?.username || "Anonyme"} –{" "}
          {publishedAt ? new Date(publishedAt).toLocaleDateString() : "Date inconnue"}
        </p>
      </div>
    </Link>
  );
}




