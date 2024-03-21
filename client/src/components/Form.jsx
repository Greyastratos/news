import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';
const refresh = () => {
  window.location.reload();
};

const NewsForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/create-news`, JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const response = await axios.get(`${API_URL}/get-news`);

      setFormData({ title: '', description: '', content: '', author: '' });

      refresh()
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  return (
    <>    
    <h3>Crea una noticia</h3>
    <form onSubmit={handleSubmit} className="mt-8 bg-slate-800">
      <label htmlFor="title" className="block mb-2">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>

      <label htmlFor="description" className="block mb-2">Description:</label>
      <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>

      <label htmlFor="content" className="block mb-2">Content:</label>
      <textarea id="content" name="content" value={formData.content} onChange={handleChange}></textarea>

      <label htmlFor="author" className="block mb-2">Author:</label>
      <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form></>

  );
}

export default NewsForm;