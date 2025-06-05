
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LawyerScheduleBuilder from './LawyerScheduleBuilder';
import '../css/JoinAsLawyerForm.css';

const JoinAsLawyerForm = ({ onSubmitted }) => {
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
      if (onSubmitted) onSubmitted();
    } catch {
      toast.error('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading…</p>;
  if (lawyer) return null;

  return (
      <div className="join-lawyer-container">
        <h2 className="form-title">Join as a {isJunior ? 'Junior' : 'Senior'} Lawyer</h2>
        <p className="form-subtitle">{step === 1 ? 'Your Application will be reviewed by the admin' : 'Complete your profile'}</p>
        <p style={{ textAlign: 'right' }}>
        <span
            onClick={() => setIsJunior(!isJunior)}
            style={{ cursor: 'pointer', color: '#4f46e5', textDecoration: 'underline' }}
        >
          {isJunior ? 'Switch to Senior Lawyer Form' : 'Join as Junior Lawyer'}
        </span>
        </p>

        <form className="lawyer-form" onSubmit={handleSubmit}>
          {step === 1 && (
              <>
                <div className="form-grid">
                  <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
                  {!isJunior && (
                      <input name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} />
                  )}
                  <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                  <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
                  <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
                  <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                  <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                  <div className="file-input">
                    <label>{isJunior ? 'Upload Progress Report (PDF)' : 'Upload License Document'}</label>
                    <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, 'licenseFile')} />
                  </div>
                  <div className="file-input">
                    <label>Upload Photo</label>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePhoto')} />
                  </div>
                </div>
                <div className="schedule-builder">
                  <LawyerScheduleBuilder onScheduleChange={setSchedule} />
                </div>
                <button type="button" className="submit-btn" onClick={handleNext}>Next</button>
              </>
          )}

          {step === 2 && (
              <>
                {isJunior && (
                    <input name="expectedGraduation" placeholder="Expected Graduation Year" value={form.expectedGraduation} onChange={handleChange} />
                )}
                <textarea name="description" placeholder="Short Description" value={form.description} onChange={handleChange} />
                <textarea name="specialCase" placeholder="Special Case or Interest" value={form.specialCase} onChange={handleChange} />
                <input name="socialLink" placeholder="Social Link (optional)" value={form.socialLink} onChange={handleChange} />

                {!isJunior && (
                    <>
                      <h3>Work Experience</h3>
                      <div className="form-grid">
                        <input name="workCourt" placeholder="Court" value={form.workCourt} onChange={handleChange} />
                        <input name="workFrom" placeholder="From" value={form.workFrom} onChange={handleChange} />
                        <input name="workTo" placeholder="To" value={form.workTo} onChange={handleChange} />
                        <button type="button" onClick={addWork}>Add</button>
                      </div>
                      <ul>
                        {workList.map((w, i) => (
                            <li key={i}>📁 {w.court} ({w.from}–{w.to})</li>
                        ))}
                      </ul>
                    </>
                )}

                <h3>Your Academic Details</h3>
                <div className="form-grid">
                  <input name="eduDegree" placeholder="Degree" value={form.eduDegree} onChange={handleChange} />
                  <input name="eduInstitute" placeholder="Institute name" value={form.eduInstitute} onChange={handleChange} />
                  <input name="eduYear" placeholder="Year" value={form.eduYear} onChange={handleChange} />
                  <input name="eduSpecialization" placeholder="Specialization" value={form.eduSpecialization} onChange={handleChange} />
                  <button type="button" onClick={addEducation}>Add</button>
                </div>
                <ul>
                  {educationList.map((e, i) => (
                      <li key={i}>🎓 {e.degree} - {e.institute} ({e.year}) | {e.specialization}</li>
                  ))}
                </ul>

                <button type="submit" className="submit-btn">Join</button>
              </>
          )}
        </form>
      </div>
  );
};

export default JoinAsLawyerForm;
