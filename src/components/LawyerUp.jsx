import React, { useState } from 'react';
import LawyerCard from './LawyerCard';
import AppointmentModal from '.././modals/AppointmentModal';
import '../css/LawyerUp.css';

const dummyLawyers = [
    { name: 'Ram Prasad', specialization: 'Criminal Law', contact: '9812345678', education: 'LLB, TU', rating: 4, charge: 1500 },
    { name: 'Sita Kumari', specialization: 'Civil Law', contact: '9801234567', education: 'LLM, KU', rating: 5, charge: 2000 },
    { name: 'Hari Bahadur', specialization: 'Family Law', contact: '9823456789', education: 'LLB, Purbanchal', rating: 3, charge: 1200 },
    { name: 'Gita Rana', specialization: 'Tax Law', contact: '9867891234', education: 'LLM, TU', rating: 4, charge: 1800 },
    { name: 'Shyam Kharel', specialization: 'Corporate Law', contact: '9845671234', education: 'LLB, KU', rating: 4, charge: 2200 },
    { name: 'Mina Joshi', specialization: 'Human Rights', contact: '9887654321', education: 'LLM, TU', rating: 5, charge: 2500 },
];


const LawyerUp = () => {
    const [selectedLawyer, setSelectedLawyer] = useState(null);

    return (
        <div className="lawyerup-container">
            <h2>LawyerUp</h2>
            <div className="lawyer-grid">
                {dummyLawyers.map((lawyer, index) => (
                    <div key={index} onClick={() => setSelectedLawyer(lawyer)}>
                        <LawyerCard {...lawyer} />
                    </div>
                ))}
            </div>

            {selectedLawyer && (
                <AppointmentModal
                    lawyer={selectedLawyer}
                    onClose={() => setSelectedLawyer(null)}
                />
            )}
        </div>
    );
};

export default LawyerUp;
