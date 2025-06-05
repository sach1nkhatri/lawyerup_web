import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import '../css/NewsPage.css';
import '../../css/nprogress.css';
import NProgress from 'nprogress';

const API_URL = `${process.env.REACT_APP_API_URL}news`;

const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                NProgress.start();
                const response = await axios.get(API_URL);
                setNewsData(response.data);
                NProgress.done();
            } catch (error) {
                console.error('Failed to fetch news:', error);
                NProgress.done();
            }
        };

        fetchNews();
    }, []);

    const handleCardClick = (newsItem) => setSelectedNews(newsItem);
    const handleBackClick = () => setSelectedNews(null);

    return (
        <div className="news-page">
            <h2 className="news-heading">News & Article</h2>

            {selectedNews ? (
                <div className="news-detail-view">
                    <button className="back-button" onClick={handleBackClick}>← Back to all news</button>
                    <img className="news-detail-image" src={selectedNews.image} alt={selectedNews.title} />
                    <h3 className="news-detail-title">{selectedNews.title}</h3>
                    <p className="news-detail-meta">By {selectedNews.author} | {selectedNews.date}</p>
                    <p className="news-detail-body">{selectedNews.fullText || selectedNews.summary}</p>
                </div>
            ) : (
                <div className="news-grid">
                    {newsData.map((item) => (
                        <NewsCard
                            key={item._id}
                            title={item.title}
                            author={item.author}
                            summary={item.summary}
                            date={item.date}
                            image={item.image}
                            onClick={() => handleCardClick(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsPage;
