// app/articles/[slug]/page.js
import { fetchArticleBySlug } from "@/lib/api";
import RichTextRenderer from "@/components/RichTextRenderer";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";

export default async function ArticlePage({ params }) {
  const article = await fetchArticleBySlug(params.slug);

  if (!article) return <p>Article introuvable.</p>;

  const { id, title, content, state, publishedAt, coverImage, author, comments } = article;
  const imageUrl = article.coverImage?.data?.attributes?.url
    ? `${process.env.URL}${coverImage.url}`
    : "/placeholder.png";

  return (
    <main className="container mx-auto p-4">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {author?.username || "Anonyme"} –{" "}
        {publishedAt ? new Date(publishedAt).toLocaleDateString() : "Date inconnue"}
      </p>

      <article className="prose max-w-none">
        <RichTextRenderer content={content} />
      </article>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold mb-2">Commentaires</h2>
      <CommentList comments={comments || []} />
      <CommentForm articleId={id} />
    </main>
  );
}


