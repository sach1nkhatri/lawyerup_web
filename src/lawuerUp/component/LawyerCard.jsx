import React from 'react';
import Swal from 'sweetalert2';
import '../css/LawyerCard.css';

const LawyerCard = ({ lawyer, onViewProfile, showShare }) => {
    const hasReviews = lawyer.reviews && lawyer.reviews.length > 0;

    const totalRatings = hasReviews
        ? lawyer.reviews.reduce((sum, r) => sum + r.rating, 0)
        : 0;
    const avgRating = hasReviews ? totalRatings / lawyer.reviews.length : 0;
    const rounded = Math.round(avgRating);

    const stars = '⭐'.repeat(rounded) + '☆'.repeat(5 - rounded);

    const profileLink = `${window.location.origin}/lawyer/${lawyer._id}`;

    const handleShare = () => {
        Swal.fire({
            title: 'Share Lawyer Profile',
            text: 'Copy the link or share directly',
            showCancelButton: true,
            confirmButtonText: '📋 Copy Link',
            cancelButtonText: '🔗 Share',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                navigator.clipboard.writeText(profileLink);
                Swal.fire('Copied!', 'Link has been copied to clipboard.', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (navigator.share) {
                    navigator
                        .share({
                            title: `${lawyer.fullName} - ${lawyer.specialization}`,
                            text: `Check out ${lawyer.fullName} on LawyerUp`,
                            url: profileLink,
                        })
                        .catch((err) => {
                            console.warn('Share failed:', err);
                            Swal.fire('Oops!', 'Share not supported or failed.', 'error');
                        });
                } else {
                    Swal.fire('Not Supported', 'This browser does not support native sharing.', 'warning');
                }
            }
        });
    };

    return (
        <div className="lawyer-card">
            <img
                src={
                    lawyer.profilePhoto?.startsWith('data:image')
                        ? lawyer.profilePhoto
                        : `${process.env.REACT_APP_UPLOADS_URL}${lawyer.profilePhoto || 'avatar.png'}`
                }
                alt="Lawyer"
                className="lawyer-photo"
            />
            <div className="lawyer-info">
                <p><strong>{lawyer.fullName}</strong></p>
                <p>{lawyer.specialization}</p>
                <div className="rating">{stars}</div>

                {showShare ? (
                    <button className="share-btn" onClick={handleShare}>Share</button>
                ) : (
                    <button onClick={onViewProfile}>View Profile</button>
                )}
            </div>
        </div>
    );
};

export default LawyerCard;
