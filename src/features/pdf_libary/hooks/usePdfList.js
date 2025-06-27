import { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../../app/api/api_endpoints';

const usePdfList = () => {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPdfs = async () => {
            const start = Date.now();
            try {
                const res = await axios.get(API.PDF);
                setPdfs(res.data);
            } catch (err) {
                console.error('Error fetching PDFs:', err);
            } finally {
                const elapsed = Date.now() - start;
                const delay = Math.max(200 - elapsed, 0);
                setTimeout(() => setLoading(false), delay);
            }
        };

        fetchPdfs();
    }, []);

    return { pdfs, loading };
};

export default usePdfList;
