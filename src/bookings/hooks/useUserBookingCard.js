import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { notify } from '../../utils/notify';

export const useUserBookingCard = (booking, onCancel) => {
    const [showReview, setShowReview] = useState(false);

    const lawyerProfile = booking.lawyerList;
    const lawyerUser = booking.lawyer;
    const client = booking.user;

    const lawyerImg = lawyerProfile?.profilePhoto?.startsWith('data:image')
        ? lawyerProfile.profilePhoto
        : `${process.env.REACT_APP_UPLOADS_URL}${lawyerProfile?.profilePhoto || 'avatar.png'}`;

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: 'Cancel Booking?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e24c4c',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}bookings/${booking._id}`);
                notify('success', 'Booking cancelled.');
                onCancel?.(booking._id);
            } catch (err) {
                console.error('Cancel error:', err);
                notify('error', '❌ Failed to cancel booking.');
            }
        }
    };

    return {
        showReview,
        setShowReview,
        lawyerProfile,
        lawyerUser,
        client,
        lawyerImg,
        handleCancel
    };
};
