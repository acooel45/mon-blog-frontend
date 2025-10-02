import { fetchArticleBySlug } from '../../lib/api';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
import { useState } from 'react';

export default function ArticlePage({ article }) {
  const [comments, setComments] = useState(article.attributes.comments.data);
  const { title, content, coverImage, author, publishedAt } = article.attributes;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">{author.data.attributes.username} - {new Date(publishedAt).toLocaleDateString()}</p>
      {coverImage?.data && (
        <img src={`http://localhost:1337${coverImage.data.attributes.url}`} alt={title} className="mb-4 w-full h-96 object-cover rounded" />
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
      <hr className="my-4" />
      <h2 className="text-2xl font-bold mb-2">Commentaires</h2>
      <CommentList comments={comments} />
      <CommentForm articleId={article.id} onCommentAdded={(newComment) => setComments([...comments, newComment.data])} />
    </div>
  );
}

export async function getStaticPaths() {
  const articles = await fetch(`http://localhost:1337/api/articles?filters[status][$eq]=published`);
  const data = await articles.json();
  const paths = data.data.map(a => ({ params: { slug: a.attributes.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const article = await fetchArticleBySlug(params.slug);
  return { props: { article }, revalidate: 60 };
}
