import { useState } from 'react';
import Swal from 'sweetalert2';
import { notify } from '../../../app/shared_components/utils/notify';
import { startLoader, stopLoader } from '../utils/loader';

export const useFinalListingForm = (lawyer, { onReapply, onHold }) => {
    const [form, setForm] = useState({
        phone: lawyer.phone || '',
        state: lawyer.state || '',
        city: lawyer.city || '',
        address: lawyer.address || '',
        qualification: lawyer.qualification || '',
        specialization: lawyer.specialization || '',
        description: lawyer.description || '',
        specialCase: lawyer.specialCase || '',
        socialLink: lawyer.socialLink || ''
    });

    const [education, setEducation] = useState(
        lawyer.education?.length ? lawyer.education : [{ degree: '', institute: '', year: '', specialization: '' }]
    );

    const [workExperience, setWorkExperience] = useState(
        lawyer.workExperience?.length ? lawyer.workExperience : [{ court: '', from: '', to: '' }]
    );

    const [editableSchedule, setEditableSchedule] = useState(lawyer.schedule || {});
    const [profilePhoto, setProfilePhoto] = useState(lawyer.profilePhoto || '');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEducationChange = (index, field, value) => {
        const updated = [...education];
        updated[index][field] = value;
        setEducation(updated);
    };

    const handleWorkChange = (index, field, value) => {
        const updated = [...workExperience];
        updated[index][field] = value;
        setWorkExperience(updated);
    };

    const addEducation = () => setEducation(prev => [...prev, { degree: '', institute: '', year: '', specialization: '' }]);
    const removeEducation = (index) => {
        if (education.length > 1)
            setEducation(prev => prev.filter((_, i) => i !== index));
    };

    const addWork = () => setWorkExperience(prev => [...prev, { court: '', from: '', to: '' }]);
    const removeWork = (index) => {
        if (workExperience.length > 1)
            setWorkExperience(prev => prev.filter((_, i) => i !== index));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                startLoader();
                const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/${lawyer._id}/photo`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ photo: reader.result }),
                });

                if (!res.ok) throw new Error();
                notify('success', 'Profile photo updated!');
                setProfilePhoto(reader.result);
            } catch {
                notify('error', 'Failed to update photo');
            } finally {
                stopLoader();
            }
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        const result = await Swal.fire({
            title: 'Save Changes?',
            text: 'Do you want to save your profile updates?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Save',
        });

        if (!result.isConfirmed) return;

        try {
            startLoader();
            const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/${lawyer._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    schedule: editableSchedule,
                    education,
                    workExperience,
                }),
            });

            if (res.ok) {
                notify('success', 'Changes saved successfully!');
            } else {
                notify('error', 'Failed to save changes.');
            }
        } catch {
            notify('error', 'Error occurred during update.');
        } finally {
            stopLoader();
        }
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Delete Profile?',
            text: 'This will permanently delete your profile.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (!result.isConfirmed) return;

        try {
            startLoader();
            const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/${lawyer._id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                notify('warn', 'Profile deleted');
                onReapply();
            } else {
                notify('error', 'Failed to delete profile');
            }
        } catch {
            notify('error', 'Network error while deleting');
        } finally {
            stopLoader();
        }
    };

    const handleHold = async () => {
        try {
            startLoader();
            const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/${lawyer._id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'hold' }),
            });

            if (res.ok) {
                notify('warn', 'Profile put on hold');
                onHold();
            } else {
                notify('error', 'Failed to hold profile');
            }
        } catch {
            notify('error', 'Network error');
        } finally {
            stopLoader();
        }
    };

    return {
        form,
        education,
        workExperience,
        editableSchedule,
        profilePhoto,
        setEditableSchedule,
        handleInputChange,
        handleEducationChange,
        handleWorkChange,
        addEducation,
        removeEducation,
        addWork,
        removeWork,
        handleFileChange,
        handleSave,
        handleDelete,
        handleHold
    };
};
