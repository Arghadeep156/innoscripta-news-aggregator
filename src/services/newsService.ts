import axios from "axios";

// Define the structure of an article (Interface Segregation Principle - ISP)
export interface Article {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  source: string;
  publishedAt: string;
}

// API URLs and Keys (Environment variables should be used for security)
const GUARDIAN_API = "https://content.guardianapis.com/search";
const NYT_API = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const NEWS_API = "https://newsapi.org/v2/top-headlines";

const GUARDIAN_KEY = "52bce1c4-70c6-4bc8-ac2f-ffed1f6ac1b0";
const NYT_KEY = "R8ZkEmfYd2lbmWNEImMKshUq6fFyQpOb";
const NEWS_API_KEY = "afeadb1e5cdf4563941edde501b83380";

// **1️⃣ Function to Fetch from The Guardian**
export const fetchGuardianArticles = async (query = "", category = ""): Promise<Article[]> => {
  const response = await axios.get(GUARDIAN_API, {
    params: {
      q: query,
      section: category || undefined,
      "api-key": GUARDIAN_KEY,
      "show-fields": "thumbnail,headline",
    },
  });

  return response.data.response.results.map((article: any) => ({
    title: article.webTitle,
    description: "",
    url: article.webUrl,
    imageUrl: article.fields?.thumbnail || "",
    source: "The Guardian",
    publishedAt: article.webPublicationDate,
  }));
};

// Function to Fetch from The New York Times
export const fetchNYTArticles = async (query = "", category = ""): Promise<Article[]> => {
  const response = await axios.get(NYT_API, {
    params: {
      q: query,
      fq: category ? `section_name:("${category}")` : undefined,
      "api-key": NYT_KEY,
    },
  });

  return response.data.response.docs.map((article: any) => ({
    title: article.headline.main,
    description: article.abstract,
    url: article.web_url,
    imageUrl: article.multimedia?.[0]?.url
      ? `https://www.nytimes.com/${article.multimedia[0].url}`
      : "",
    source: "New York Times",
    publishedAt: article.pub_date,
  }));
};

// Function to Fetch from NewsAPI**
export const fetchNewsAPIArticles = async (query = "", category = ""): Promise<Article[]> => {
  const response = await axios.get(NEWS_API, {
    params: {
      q: query,
      category: category || undefined,
      apiKey: NEWS_API_KEY,
    },
  });

  return response.data.articles.map((article: any) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt,
  }));
};

// Function to Fetch from All Sources**
export const fetchAllArticlesByCategory = async (query = "", category = ""): Promise<Article[]> => {
  const results = await Promise.all([
    fetchGuardianArticles(query, category),
    fetchNYTArticles(query, category),
    fetchNewsAPIArticles(query, category),
  ]);

  return results.flat().sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Function to Fetch Articles Based on Selected Source**
export const fetchArticlesBySource = async (query = "", category = "", source = "All"): Promise<Article[]> => {
  if (source === "The Guardian") return fetchGuardianArticles(query, category);
  if (source === "New York Times") return fetchNYTArticles(query, category);
  if (source === "NewsAPI") return fetchNewsAPIArticles(query, category);
  
  // If "All Sources" is selected, fetch from all
  return fetchAllArticlesByCategory(query, category);
};
