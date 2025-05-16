import React, { useState, useEffect } from 'react';
import '../css/LoginSignup.css';
import hammerIcon from '../assets/hammer.png';
import logoIcon from '../assets/logo2.png';
import logoText from '../assets/textlogoblack.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        role: 'user',
        fullName: '',
        email: '',
        password: '',
        contactNumber: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('lawyerup_token');
        if (token) {
            navigate('/dashboard');
        }
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isLogin
            ? 'http://localhost:5000/api/auth/login'
            : 'http://localhost:5000/api/auth/signup';

        const payload = isLogin
            ? {
                email: formData.email,
                password: formData.password,
            }
            : {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                contactNumber: formData.contactNumber,
            };

        try {
            const res = await axios.post(endpoint, payload);
            const { user, token } = res.data;

            // Save auth info
            localStorage.setItem('lawyerup_token', token);
            localStorage.setItem('lawyerup_user', JSON.stringify(user));
            if (isLogin) {
                localStorage.setItem('auth', 'true'); // ✅ THIS IS NEEDED
                console.log('Logging in user:', formData.email);
                navigate('/dashboard'); // ✅ Should work if auth is set
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <div className="auth-container">
            <div className="logo-wrap">
                <img src={logoIcon} alt="Logo" className="logo-icon" />
                <img src={logoText} alt="LawyerUp" className="logo-text" />
            </div>

            <div className="form-container">
                <h2>{isLogin ? 'Welcome Back' : 'Join Us'}</h2>
                <h1>{isLogin ? 'Sign in' : 'Create Your Account'}</h1>

                <div className="login-box">
                    <div className="gif-container">
                        <img src={hammerIcon} alt="Hammer" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="input-dropdown"
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="lawyer">Lawyer</option>
                                </select>

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </>
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email or Username"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                        {isLogin && (
                            <a href="#" className="forgot-pass">
                                Forgot password?
                            </a>
                        )}
                    </form>

                    <p className="switch-form">
                        {isLogin ? "Don’t have an account?" : "Already have an account?"}{' '}
                        <button
                            type="button"
                            className="switch-link"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignUp;
