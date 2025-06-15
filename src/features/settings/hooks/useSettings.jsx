import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const useSettings = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [formData, setFormData] = useState({});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('lawyerup_user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setFormData({
                name: parsed.fullName || '',
                email: parsed.email || '',
                phone: parsed.contactNumber || '',
                state: parsed.state || '',
                city: parsed.city || '',
                address: parsed.address || '',
            });
        }

        // ⏳ Simulate loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);


    const toggleTheme = () => {
        setDarkMode(prev => !prev);
        document.documentElement.classList.toggle('dark-mode');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setHasChanged(true);
    };

    const handleEditClick = async () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        if (!hasChanged) {
            setIsEditing(false);
            return;
        }

        const confirm = await Swal.fire({
            title: 'Save Changes?',
            text: 'Do you want to save your updated profile?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, save it!',
        });

        if (confirm.isConfirmed) {
            try {
                const token = localStorage.getItem('lawyerup_token');
                const res = await axios.patch(`${process.env.REACT_APP_API_URL}auth/update-profile`, {
                    name: formData.name,
                    contactNumber: formData.phone,
                    state: formData.state,
                    city: formData.city,
                    address: formData.address,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                await Swal.fire('Updated!', 'Your profile was saved.', 'success');
                setIsEditing(false);
                setHasChanged(false);
                localStorage.setItem('lawyerup_user', JSON.stringify(res.data.user));
                setUser(res.data.user);
            } catch (err) {
                await Swal.fire('Error!', err.response?.data?.message || 'Failed to update.', 'error');
            }
        }
    };

    return {
        darkMode,
        formData,
        user,
        isEditing,
        hasChanged,
        loading,
        handleChange,
        handleEditClick,
        toggleTheme,
    };
};
