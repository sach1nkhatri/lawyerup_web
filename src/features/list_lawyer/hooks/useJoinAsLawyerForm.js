import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export const useJoinAsLawyerForm = (onSubmitted) => {
    const [loading, setLoading] = useState(true);
    const [lawyer, setLawyer] = useState(null);
    const [step, setStep] = useState(1);
    const [isJunior, setIsJunior] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [workList, setWorkList] = useState([]);

    const [form, setForm] = useState({
        fullName: '',
        specialization: '',
        email: '',
        phone: '',
        state: '',
        city: '',
        address: '',
        profilePhoto: null,
        licenseFile: null,
        description: '',
        specialCase: '',
        socialLink: '',
        workCourt: '',
        workFrom: '',
        workTo: '',
        eduDegree: '',
        eduInstitute: '',
        eduYear: '',
        eduSpecialization: '',
        expectedGraduation: ''
    });

    useEffect(() => {
        const loadProfile = async () => {
            const token = localStorage.getItem('lawyerup_token');
            if (!token) return setLoading(false);
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setLawyer(data);
                }
            } catch {}
            finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setForm(prev => ({ ...prev, [key]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const addEducation = () => {
        const { eduDegree, eduInstitute, eduYear, eduSpecialization } = form;
        if (!eduDegree || !eduInstitute || !eduYear) {
            Swal.fire({ icon: 'warning', title: 'Incomplete Education', text: 'Fill all fields for education.' });
            return;
        }
        setEducationList(prev => [...prev, {
            degree: eduDegree,
            institute: eduInstitute,
            year: eduYear,
            specialization: eduSpecialization
        }]);
        setForm(prev => ({ ...prev, eduDegree: '', eduInstitute: '', eduYear: '', eduSpecialization: '' }));
    };

    const addWork = () => {
        const { workCourt, workFrom, workTo } = form;
        if (!workCourt || !workFrom || !workTo) {
            Swal.fire({ icon: 'warning', title: 'Incomplete Work', text: 'Fill all fields for work experience.' });
            return;
        }
        setWorkList(prev => [...prev, {
            court: workCourt,
            from: workFrom,
            to: workTo
        }]);
        setForm(prev => ({ ...prev, workCourt: '', workFrom: '', workTo: '' }));
    };

    const handleNext = () => {
        const required = ['fullName', 'email', 'phone', 'state', 'city', 'address'];
        if (!isJunior) required.push('specialization');
        const missing = required.filter(k => !form[k]);
        if (missing.length) {
            Swal.fire({ icon: 'warning', title: 'Incomplete Fields', text: 'Fill all required fields.' });
            return;
        }
        if (!form.licenseFile || !form.profilePhoto) {
            Swal.fire({ icon: 'warning', title: 'Missing Uploads', text: 'Upload required documents.' });
            return;
        }
        if (!schedule || schedule.length === 0) {
            Swal.fire({ icon: 'warning', title: 'Availability Missing', text: 'Please add at least one availability slot.' });
            return;
        }
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { description, specialCase } = form;
        if (!description || !specialCase || educationList.length === 0) {
            Swal.fire({ icon: 'warning', title: 'Final Step Incomplete', text: 'Fill all required fields and at least 1 education entry.' });
            return;
        }
        try {
            setLoading(true);
            const token = localStorage.getItem('lawyerup_token');
            const payload = {
                ...form,
                education: educationList,
                workExperience: isJunior ? [] : workList,
                schedule,
                role: isJunior ? 'junior' : 'senior'
            };
            const res = await fetch(`${process.env.REACT_APP_API_URL}lawyers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error();
            toast.success('Application submitted!');
            onSubmitted?.();
        } catch {
            toast.error('Submission failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        lawyer,
        step,
        form,
        schedule,
        isJunior,
        educationList,
        workList,
        setIsJunior,
        setStep,
        setSchedule,
        handleChange,
        handleFileChange,
        addEducation,
        addWork,
        handleNext,
        handleSubmit
    };
};