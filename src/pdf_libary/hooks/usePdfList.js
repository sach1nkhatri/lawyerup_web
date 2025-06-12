
import { useState, useEffect } from 'react';
import axios from 'axios';

const usePdfList = () => {
    const [pdfs, setPdfs] = useState([]);

    const fetchPdfs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/pdfs');
            setPdfs(res.data);
        } catch (err) {
            console.error('Error fetching PDFs:', err);
        }
    };

    useEffect(() => {
        fetchPdfs();
    }, []);

    return pdfs;
};

export default usePdfList;
