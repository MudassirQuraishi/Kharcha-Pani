import React, { useState, useEffect } from 'react';
import Popup from './Popup'
import Validation from './Validation'
import axios from 'axios';

const Signup = ({ switchToLogin, API_BASE_URL }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        let timer;
        if (serverError) {
            timer = setTimeout(() => {
                setServerError('');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [serverError]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'confirmPassword') {
            setFormErrors({
                ...formErrors,
                confirmPassword: '',
            });
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
        setServerError('');

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const userData = {
                userName: formData.name,
                userPassword: formData.password,
                userEmail: formData.email,
            }
            const response = await axios.post('http://localhost:3000/user/signup', userData);
            if (response.status === 409 || response.status === 201) {
                switchToLogin();
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setServerError('Server error. Please try again.');
            }
            console.log(error)
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
                    {formErrors.name && <Validation data={formErrors.name}></Validation>}
                    <input
                        type="email"
                        className='input-field'
                        placeholder='Enter Your Email'
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {formErrors.email && <Validation data={formErrors.email}></Validation>}
                    <input
                        type="password"
                        className='input-field'
                        placeholder='Enter Your Password'
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {formErrors.password && <Validation data={formErrors.password}></Validation>}
                    <input
                        type="password"
                        className='input-field'
                        placeholder='Confirm Your Password'
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    {formErrors.confirmPassword && <Validation data={formErrors.confirmPassword}></Validation>}
                    <button type='submit' className='submitButton'>Signup</button>
                </div>
                <div>
                    Already have an account?
                    <span className="switch" onClick={switchToLogin}>Login</span>
                    <p></p>
                </div>
            </form>
            {serverError && (
                <Popup error={serverError} ></Popup>
            )}
        </div >
    );
};

export default Signup;
