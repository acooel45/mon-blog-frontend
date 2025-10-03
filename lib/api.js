const api_url = process.env.API_URL

export async function fetchArticles() {
  try {
    const res = await fetch(
      `${api_url}/articles?filters[state][$eq]=published&filters[publishedAt][$notNull]=true&?populate[coverImage][fields]=url,alternativeText&?populate[author]=*`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.error("Erreur fetchArticles:", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error("Erreur fetchArticles:", err);
    return [];
  }
}

export async function fetchArticleBySlug(slug) {
  try {
    const res = await fetch(
      `${api_url}/articles?filters[slug][$eq]=${slug}&?populate[author]=*&?populate[coverImage][fields]=url,alternativeText`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (err) {
    console.error("Erreur fetchArticleBySlug:", err);
    return null;
  }
}

export async function postComment(articleId, authorName, content) {
  try {
    const res = await fetch(`${api_url}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: { article: articleId, authorName, content },
      }),
    });
    return await res.json();
  } catch (err) {
    console.error("Erreur postComment:", err);
    return null;
  }
}

