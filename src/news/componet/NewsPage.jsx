import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import '../css/NewsPage.css';
import '../../utils/css/nprogress.css';
import NProgress from 'nprogress';
import {notify} from "../../utils/notify";

const API_URL = `${process.env.REACT_APP_API_URL}news`;

const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

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

    const handleCardClick = (newsItem) => {
        setSelectedNews(newsItem);
        setComments(newsItem.comments || []);
    };

    const handleBackClick = () => {
        setSelectedNews(null);
        setCommentText('');
    };

    const handleLike = async () => {
        const userId = localStorage.getItem('userId') || 'anon-user';
        try {
            const res = await axios.post(`${API_URL}/${selectedNews._id}/like`, { userId });
            setSelectedNews({ ...selectedNews, likes: res.data.likes, dislikes: res.data.dislikes });
            notify('success', 'Liked!');
        } catch (err) {
            notify('error', err.response?.data?.error || 'Like failed');
        }
    };

    const handleDislike = async () => {
        const userId = localStorage.getItem('userId') || 'anon-user';
        try {
            const res = await axios.post(`${API_URL}/${selectedNews._id}/dislike`, { userId });
            setSelectedNews({ ...selectedNews, likes: res.data.likes, dislikes: res.data.dislikes });
            notify('success', 'Disliked!');
        } catch (err) {
            notify('error', err.response?.data?.error || 'Dislike failed');
        }
    };

    const handleComment = async () => {
        const token = localStorage.getItem('lawyerup_token');
        if (!commentText.trim()) return;

        try {
            const res = await axios.post(
                `${API_URL}/${selectedNews._id}/comment`,
                { text: commentText.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments(res.data.comments);
            setCommentText('');
            notify('success', 'Comment posted!');
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to post comment';
            notify('error', msg);
        }
    };


    return (
        <div className="news-page">
            <h2 className="news-heading">News & Article</h2>

            {selectedNews ? (
                <div className="news-detail-view">
                    <button className="back-button" onClick={handleBackClick}>← Back to all news</button>
                    <img className="news-detail-image" src={selectedNews.image} alt={selectedNews.title} />
                    <h3 className="news-detail-title">{selectedNews.title}</h3>
                    <p className="news-detail-meta">By {selectedNews.author} | {selectedNews.date}</p>

                    <div className="news-detail-body">
                        {(selectedNews.fullText || selectedNews.summary)
                            .split('\n')
                            .map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                    </div>

                    <div className="news-reactions">
                        <button onClick={handleLike}>👍 {selectedNews.likes || 0}</button>
                        <button onClick={handleDislike}>👎 {selectedNews.dislikes || 0}</button>
                    </div>

                    <div className="news-comments">
                        <h4>Comments</h4>
                        <textarea
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="comment-box"
                        />
                        <button className="comment-submit" onClick={handleComment}>Post</button>

                        <div className="comment-thread">
                            {comments.length === 0 ? (
                                <p className="comment-item">💬 No comments yet.</p>
                            ) : comments.map((c, i) => (
                                <p key={i} className="comment-item"><strong>{c.user}</strong>: {c.text}</p>
                            ))}
                        </div>
                    </div>
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
                            likes={item.likes}
                            dislikes={item.dislikes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsPage;
