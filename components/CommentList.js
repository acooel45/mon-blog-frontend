export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>Aucun commentaire pour le moment.</p>;
  }

  return (
    <ul className="space-y-2">
      {comments.map((comment) => (
        <li key={comment.id} className="p-2 border rounded bg-gray-50">
          <p className="font-bold">{comment.authorName}</p>
          <p>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}


