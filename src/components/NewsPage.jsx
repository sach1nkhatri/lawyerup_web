// src/components/News.jsx
import React from 'react';
import NewsData from '../data/NewsData';
import NewsCard from './NewsCard';
import '../css/NewsPage.css';

const NewsPage = () => {
    return (
        <div className="news-page">
            <h2 className="news-heading">News & Article</h2>
            <div className="news-grid">
                {NewsData.map((item) => (
                    <NewsCard
                        key={item.id}
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
