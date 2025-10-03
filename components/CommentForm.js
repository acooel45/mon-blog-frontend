"use client";

import { useState } from "react";
import { postComment } from "@/lib/api";

export default function CommentForm({ articleId }) {
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postComment(articleId, authorName, content);
    if (res?.data) {
      setStatus("Commentaire ajouté !");
      setAuthorName("");
      setContent("");
    } else {
      setStatus("Erreur lors de l’envoi.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Votre nom"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Votre commentaire..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Envoyer
      </button>
      {status && <p className="text-sm">{status}</p>}
    </form>
  );
}


