import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ switchToLogin, API_BASE_URL }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'confirmPassword') {
            setPasswordMatchError(false);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        if (!formData.confirmPassword.trim()) {
            errors.confirmPassword = 'Please confirm password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});

        console.log('Signing up with:', formData);

        try {
            const response = axios.post(`${API_BASE_URL}/user/signup`, formData);
            console.log(response)
            //switchToLogin();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='form-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className='input-fields'>
                    <input
                        type="text"
                        className='input-field'
                        placeholder='Enter Your Name'
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {formErrors.name && <p className="error-message">{formErrors.name}</p>}
                    <input
                        type="email"
                        className='input-field'
                        placeholder='Enter Your Email'
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                    <input
                        type="password"
                        className='input-field'
                        placeholder='Enter Your Password'
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {formErrors.password && <p className="error-message">{formErrors.password}</p>}
                    <input
                        type="password"
                        className='input-field'
                        placeholder='Confirm Your Password'
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    {formErrors.confirmPassword && <p className="error-message">{formErrors.confirmPassword}</p>}
                    {passwordMatchError && <p className="error-message">Passwords do not match!</p>}
                    <button type='submit' className='submitButton'>Signup</button>
                </div>
                <div>
                    Already have an account?{' '}
                    <span className="switch" onClick={switchToLogin}>Login</span>
                    <p></p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
