import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LawyerCard from './LawyerCard';
import LawyerProfilePanel from './LawyerProfilePanel';
import '../css/LawyerUp.css';
import axios from 'axios';
import { startLoader, stopLoader } from '../../utils/loader'; // ✅ NProgress loader

const LawyerUp = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [lawyers, setLawyers] = useState([]);
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ local flag for fallback UI

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                startLoader(); // ✅ show loader
                const response = await axios.get('http://localhost:5000/api/lawyers');
                setLawyers(response.data);
            } catch (err) {
                console.error("Failed to fetch lawyers", err);
            } finally {
                stopLoader(); // ✅ stop loader
                setLoading(false);
            }
        };
        fetchLawyers();
    }, []);

    useEffect(() => {
        if (id && lawyers.length > 0) {
            const match = lawyers.find((l) => String(l._id) === id);
            setSelectedLawyer(match || null);
        } else {
            setSelectedLawyer(null);
        }
    }, [id, lawyers]);

    const listedLawyers = lawyers.filter((l) => l.status === 'listed');

    const resolveImage = (profilePhoto) => {
        if (!profilePhoto) return null;
        return profilePhoto.startsWith('data:image')
            ? profilePhoto
            : `http://localhost:5000/uploads/${profilePhoto}`;
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading lawyers...</div>;
    }

    return (
        <div className="lawyerup-container">
            <div className="lawyerup-header">
                <h2>LawyerUp</h2>
                <div className="lawyerup-controls">
                    <input className="search-bar" placeholder="Search for lawyers" />
                    <label className="toggle-wrapper">
                        <input type="checkbox" />
                        <span className="toggle-slider" />
                    </label>
                </div>
            </div>

            {!selectedLawyer ? (
                <div className="lawyer-grid">
                    {listedLawyers.map((lawyer) => (
                        <LawyerCard
                            key={lawyer._id}
                            lawyer={{
                                ...lawyer,
                                name: lawyer.fullName,
                                contact: lawyer.phone,
                                image: resolveImage(lawyer.profilePhoto),
                                rating: lawyer.rating || 0,
                                reviews: lawyer.reviews || [],
                            }}
                            onViewProfile={() =>
                                navigate(`/dashboard/lawyerUp/lawyerProfile/${lawyer._id}`)
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="profile-split-view">
                    <LawyerCard
                        lawyer={{
                            ...selectedLawyer,
                            name: selectedLawyer.fullName,
                            contact: selectedLawyer.phone,
                            image: resolveImage(selectedLawyer.profilePhoto),
                            rating: selectedLawyer.rating || 0,
                            reviews: selectedLawyer.reviews || [],
                        }}
                        showShare
                    />
                    <LawyerProfilePanel
                        lawyer={selectedLawyer}
                        onBack={() => navigate('/dashboard/lawyerUp')}
                    />
                </div>
            )}
        </div>
    );
};

export default LawyerUp;
