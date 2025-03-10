import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "../styles/newsDisplay.css";

const categories = ["business", "sports", "technology", "health", "entertainment", "general", "science"];
const sources = ["All", "The Guardian", "New York Times", "NewsAPI"];

const NewsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [query, setQuery] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [preferencesSet, setPreferencesSet] = useState(false);

  // Load preferences from LocalStorage
  useEffect(() => {
    const storedCategory = localStorage.getItem("preferredCategory");
    const storedSource = localStorage.getItem("preferredSource");

    if (storedCategory && storedSource) {
      setSelectedCategory(storedCategory);
      setSelectedSource(storedSource);
      setPreferencesSet(true);
    }
  }, []);

  //Fetch articles using the updated `useFetch` hook
  const { articles, loading, error } = useFetch(query, selectedCategory, selectedSource, selectedDate);

  // Handles search button click
  const handleSearch = () => {
    setQuery(searchTerm); //Only update `query` when button is clicked
  };

  return (
    <div className="news-container">
      <h1 className="news-heading">News Aggregator</h1>

      {/* Ask for preferences if not set */}
      {!preferencesSet && (
        <div className="preferences-prompt">
          <h2>Set Your Preferences</h2>
          <div className="preferences">
            <div className="preference-section">
              <h3>Choose Category</h3>
              <select onChange={(e) => setSelectedCategory(e.target.value)} defaultValue="">
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="preference-section">
              <h3>Choose Source</h3>
              <select onChange={(e) => setSelectedSource(e.target.value)} defaultValue="">
                <option value="" disabled>Select a source</option>
                {sources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={() => setPreferencesSet(true)} className="save-button">Save Preferences</button>
        </div>
      )}

      {/* Show filters only after preferences are set */}
      {preferencesSet && (
        <>
          <div className="filters">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button> 

            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} className="filter-select">
              {sources.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="filter-select"
            />
          </div>

          {/* Loading and Error Handling */}
          {loading && <p className="loading">Loading articles...</p>}
          {error && <p className="error">{error}</p>}

          {/* News List */}
          <div className="news-list">
            {articles.map((article) => (
              <div key={article.url} className="news-card">
                {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="news-image" />}
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <p className="news-description">{article.description || "No description available."}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                    Read More
                  </a>
                  <p className="news-source">{article.source}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsList;
