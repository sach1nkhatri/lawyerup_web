// src/pages/News.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import '../css/NewsPage.css';

const API_URL = 'http://localhost:5000/api/news'; // Change to your production URL if needed

const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(API_URL);
                setNewsData(response.data);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-page">
            <h2 className="news-heading">News & Article</h2>
            <div className="news-grid">
                {newsData.map((item) => (
                    <NewsCard
                        key={item._id} // Use MongoDB's _id
                        title={item.title}
                        author={item.author}
                        summary={item.summary}
                        date={item.date}
                        image={item.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
