import React, { useState } from 'react';
import '../css/LoginSignup.css';
import hammerIcon from '../assets/hammer.png';
import logoIcon from '../assets/logo2.png';
import logoText from '../assets/textlogoblack.png';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        contactNumber: '',
        organizationName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            console.log('Logging in user:', formData.email);
            navigate('/dashboard');
        } else {
            alert('Signup Successful!');
            setIsLogin(true);
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
                                <input
                                    type="text"
                                    name="organizationName"
                                    placeholder="Organization Name"
                                    value={formData.organizationName}
                                    onChange={handleInputChange}
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
