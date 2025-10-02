import { useState } from 'react';
import { postComment } from '../lib/api';

export default function CommentForm({ articleId, onCommentAdded }) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = await postComment({ authorName, content, article: articleId });
    onCommentAdded(newComment);
    setAuthorName('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <input
        type="text"
        placeholder="Votre nom"
        value={authorName}
        onChange={e => setAuthorName(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <textarea
        placeholder="Votre commentaire"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Envoyer</button>
    </form>
  );
}
