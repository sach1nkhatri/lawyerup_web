import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LawyerCard from '../components/LawyerCard';
import LawyerProfilePanel from '../components/LawyerProfilePanel';
import '../css/LawyerUp.css';
import { dummyLawyers } from '../data/lawyerData';

const LawyerUp = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // grab dynamic segment like /lawyerProfile/:id

    const [selectedLawyer, setSelectedLawyer] = useState(null);

    useEffect(() => {
        if (id) {
            console.log("URL ID:", id);
            const match = dummyLawyers.find((l) => String(l.id) === id);
            console.log("Match found:", match);
            setSelectedLawyer(match || null);
        } else {
            setSelectedLawyer(null);
        }
    }, [id]);


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
                    {dummyLawyers.map((lawyer) => (
                        <LawyerCard
                            key={lawyer.id}
                            lawyer={lawyer}
                            onViewProfile={() => navigate(`/dashboard/lawyerUp/lawyerProfile/${lawyer.id}`)}
                        />
                    ))}
                </div>
            ) : (
                <div className="profile-split-view">
                    {selectedLawyer ? (
                        <>
                            <LawyerCard lawyer={selectedLawyer} showShare/>
                            <LawyerProfilePanel
                                lawyer={selectedLawyer}
                                onBack={() => navigate('/dashboard/lawyerUp')}
                            />
                        </>
                    ) : (
                        <p style={{marginLeft: '2rem', marginTop: '2rem'}}>⚠️ Lawyer not found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default LawyerUp;
