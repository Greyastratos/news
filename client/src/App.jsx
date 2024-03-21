import React, { useState, useEffect } from "react";
import Features from "./components/Features"; 
import NewsForm from "./components/Form"

const API_URL = "http://localhost:5000";

const App = () => {
  const [news, setNews] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await Features.FetchNews(); 
        if (response && response.success) {
          setNews(response.data);
        } else {
          console.error("Error fetching news:", response.error);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleShowUnarchived = () => {
    setShowArchived(false);
    fetchNews();
  };

  const handleShowArchived = () => {
    setShowArchived(true);
    fetchNews();
  };

  const renderFilteredNews = () => {
    const filteredNews = showArchived
      ? news.filter((item) => item.archiveDate !== null)
      : news.filter((item) => item.archiveDate === null);

    if (filteredNews.length > 0) {
      return (
        <ul>
          {filteredNews.map((item) => (
            <li key={item._id}>
              <div>
                <h4>News title</h4>
                <h3>{item.title}</h3>
              </div>
              <div>
                <h4>Description</h4>
                <span>{item.description}</span>
              </div>
              <div>
                <h4>Content</h4>
                <p>{item.content}</p>
              </div>
              <div>
                <h4>Author</h4>
                <span>{item.author}</span>
              </div>
              <div>
                <h4>Date Creater and archived</h4>
                <span>{new Date(item.date).toLocaleDateString().slice(0, 10).split('-').reverse().join('/')}</span>
                <br />
                <span>{new Date(item.archiveDate).toLocaleDateString().slice(0, 10).split('-').reverse().join('/')}</span>
              </div>
              {item.archiveDate ? ( 
      <Features.Remove newsId={item._id} 
      /> 
    ) : (
      <><Features.Archive newsId={item._id}  /><Features.Remove newsId={item._id} /></> 
    )}
            </li>
          ))}
        </ul>
      );
    } else {
      return <p>No news available</p>;
    }
  };

  return (
    <><div className="flex flex-wrap justify-center flex-col">
      <h1>NEWS Application</h1>
      <div>
        <button onClick={handleShowUnarchived}>Show News</button>
        <button onClick={handleShowArchived}>Show Archived</button>
      </div>
      {renderFilteredNews()}

    </div><NewsForm/></>  
  );
};

export default App;
