import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DefultInput from '../../components/Form/DefultInput';
import DefultButton from '../../components/Buttons/DefultButton';


const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
                <DefultInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
                <DefultInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
                <div className="text-center mt-6">
                    <DefultButton text="Login" btntype="submit" />
                </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                    Create one
                </Link>
            </p>
        </div>
    );
};

export default SignIn;
