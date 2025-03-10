// src/hooks/useFetch.ts
import { useState, useEffect } from "react";
import { fetchArticlesBySource, Article } from "../services/newsService";

const useFetch = (query: string, category: string, source: string, date: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArticlesBySource(query, category, source);
        
        let filteredData = data;

        //Filter by date (client-side filtering)
        if (date) {
          filteredData = filteredData.filter((article) => article.publishedAt.startsWith(date));
        }

        setArticles(filteredData);
      } catch (err) {
        setError("Failed to fetch articles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, category, source, date]);

  return { articles, loading, error };
};

export default useFetch;
