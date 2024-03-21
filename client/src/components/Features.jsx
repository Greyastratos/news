import React from 'react';
import axios from 'axios';

//Nomrmalmente aqui pondioa una variable .env pero por cuestiones practicas lo deje de esta manera
const API_URL = 'http://localhost:5000';

const FetchNews = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-news`);
      return response.data
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

const Archive=({ newsId}) =>{
  const archiveNews = async () => {
    try {
     await axios.put(`${API_URL}/archive-news`, { _id: newsId });
    } catch (error) {
      console.error('Error archiving news:', error);
    }
  };

  return (
    <button onClick={archiveNews}>
      Archive
    </button>
  );
}

const Remove=({ newsId})=> {
    const removeNews = async () => {
      try {
        await axios.put(`${API_URL}/remove-news`, { _id: newsId });
      } catch (error) {
        console.error('Error archiving news:', error);
      }
    };
  
    return (
      <button onClick={removeNews}>
        Remove 
      </button>
    );
  }

  const Features = {Archive, Remove, FetchNews}
export default Features;
