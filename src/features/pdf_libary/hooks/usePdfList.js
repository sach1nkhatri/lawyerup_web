
import { useState, useEffect } from 'react';
import axios from 'axios';

const usePdfList = () => {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true); // 🆕

    const fetchPdfs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/pdfs');
            setPdfs(res.data);
        } catch (err) {
            console.error('Error fetching PDFs:', err);
        } finally {
            setLoading(false); // 🆕
        }
    };

    useEffect(() => {
        const fetchPdfs = async () => {
            const start = Date.now(); // ⏱
            try {
                const res = await axios.get('http://localhost:5000/api/pdfs');
                setPdfs(res.data);
            } catch (err) {
                console.error('Error fetching PDFs:', err);
            } finally {
                const elapsed = Date.now() - start;
                const delay = Math.max(200 - elapsed, 0); // 🧠 wait at least 500ms
                setTimeout(() => setLoading(false), delay);
            }
        };
        fetchPdfs();
    }, []);


    return { pdfs, loading }; // 🆕
};


export default usePdfList;
