export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) return <p>Aucun commentaire.</p>;

  return (
    <ul className="space-y-2">
      {comments.map(comment => (
        <li key={comment.id} className="border p-2 rounded">
          <strong>{comment.attributes.authorName}</strong> : {comment.attributes.content}
        </li>
      ))}
    </ul>
  );
}
