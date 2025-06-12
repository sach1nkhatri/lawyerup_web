// hooks/useLawyerUp.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { startLoader, stopLoader } from '../../utils/loader';

export const useLawyerUp = () => {
    const { id } = useParams();
    const [lawyers, setLawyers] = useState([]);
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                startLoader();
                const res = await axios.get(`${process.env.REACT_APP_API_URL}lawyers`);
                setLawyers(res.data);
            } catch (err) {
                console.error("Failed to fetch lawyers", err);
            } finally {
                stopLoader();
                setLoading(false);
            }
        };

        fetchLawyers();
    }, []);

    useEffect(() => {
        if (id && lawyers.length > 0) {
            const match = lawyers.find(l => String(l._id) === id);
            setSelectedLawyer(match || null);
        } else {
            setSelectedLawyer(null);
        }
    }, [id, lawyers]);

    const resolveImage = (profilePhoto) => {
        if (!profilePhoto) return null;
        return profilePhoto.startsWith('data:image')
            ? profilePhoto
            : `${process.env.REACT_APP_UPLOADS_URL}${profilePhoto}`;
    };

    const listedLawyers = lawyers.filter(l => l.status === 'listed');

    return {
        lawyers,
        listedLawyers,
        selectedLawyer,
        loading,
        resolveImage
    };
};
