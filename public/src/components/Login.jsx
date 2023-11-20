import React, { useState } from 'react';

const LoginForm = ({ switchToSignup, API_BASE_URL }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Logging in with:', email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="6"
                required
            />
            <button type="submit">Login</button>
            <p>
                Don't have an account?{' '}
                <span className="switch" onClick={switchToSignup}>Signup</span>
            </p>
        </form>
    );
};

export default LoginForm;
