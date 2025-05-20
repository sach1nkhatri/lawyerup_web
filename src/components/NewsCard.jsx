import React from 'react';
import '../css/NewsCard.css';

const NewsCard = ({ title, author, summary, date, image, onClick }) => (
    <div className="news-card" onClick={onClick}>
        <img className="news-image" src={image} alt={title} />
        <div className="news-content">
            <h3 className="news-title">{title}</h3>
            <p className="news-author">{author}</p>
            <p className="news-summary">{summary}</p>
            <p className="news-date">{date}</p>
        </div>
    </div>
);

export default NewsCard;
