import React, { useState } from 'react';
import API from '../../../app/api/api_endpoints';
import styles from '../css/ChatPdfUpload.module.css';

const ChatPdfUpload = ({ chatId, onClose, onSend }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file) return;

        const token = localStorage.getItem('lawyerup_token');
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('chatId', chatId); // so it's added to current chat

        try {
            setLoading(true);
            await fetch(`${API.AI}/upload/chatpdf`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            // Tell parent (ChatWindow) to show this message like a prompt
            onSend(`📄 Uploaded PDF: ${file.name}`);
            onClose();
        } catch (err) {
            console.error('❌ Upload failed:', err);
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.popup}>
            <div className={styles.content}>
                <h4>Upload PDF</h4>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={handleUpload} disabled={loading || !file}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                <button className={styles.closeBtn} onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ChatPdfUpload;
