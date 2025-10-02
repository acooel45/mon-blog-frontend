const backend_url = process.env.API_URL;

export async function fetchArticles() {
  const res = await fetch(`${backend_url}/articles?filters[status][$eq]=published&populate=coverImage,author`);
  const data = await res.json();
  return data.data;
}

export async function fetchArticleBySlug(slug) {
  const res = await fetch(`${backend_url}/articles?filters[slug][$eq]=${slug}&populate=coverImage,author,comments`);
  const data = await res.json();
  return data.data[0];
}

export async function postComment(comment) {
  const res = await fetch(`${backend_url}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: comment }),
  });
  return await res.json();
}
