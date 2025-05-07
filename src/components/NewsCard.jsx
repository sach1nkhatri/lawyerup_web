// src/components/NewsCard.jsx
import React from 'react';
import '../css/NewsCard.css';

const NewsCard = ({ title, author, summary, date, image }) => {
    return (
        <div className="news-card">
            {image && <img src={image} alt="news" className="news-image" />}
            <div className="news-content">
                <h3 className="news-title">{title}</h3>
                <p className="news-author">By {author}</p>
                <p className="news-summary">{summary}</p>
                <p className="news-date">{date}</p>
            </div>
        </div>
    );
};

export default NewsCard;
