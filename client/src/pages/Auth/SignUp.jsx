import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DefultButton from '../../components/Buttons/DefultButton';
import DefultInput from '../../components/Form/DefultInput';
import Dropdown from '../../components/Form/Dropdown';


const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        faculty: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration Data:', formData);
    };

    const facultyOptions = [
        { label: 'Faculty of Agriculture', value: 'agriculture' },
        { label: 'Faculty of Allied Health Sciences', value: 'allied_health_sciences' },
        { label: 'Faculty of Arts', value: 'arts' },
        { label: 'Faculty of Dental Sciences', value: 'dental_sciences' },
        { label: 'Faculty of Engineering', value: 'engineering' },
        { label: 'Faculty of Management', value: 'management' },
        { label: 'Faculty of Medicine', value: 'medicine' },
        { label: 'Faculty of Science', value: 'science' },
        { label: 'Faculty of Veterinary Medicine and Animal Science', value: 'veterinary_medicine' },
        { label: 'Postgraduate Institute of Humanities and Social Sciences (PGIHS)', value: 'pgihs' },
        { label: 'Postgraduate Institute of Agriculture (PGIA)', value: 'pgia' },
        { label: 'Postgraduate Institute of Science (PGIS)', value: 'pgis' },
    ];

    return (
        <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>
            <form onSubmit={handleSubmit}>
                <DefultInput
                    label="Username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                />
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
                    placeholder="Create a password"
                    required
                />
                <Dropdown
                    label="Faculty"
                    name="faculty"
                    onChange={handleChange}
                    required
                    options={facultyOptions}
                />
                <div className="text-center mt-6">
                    <DefultButton text="Register" btntype="submit" />
                </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/" className="text-blue-600 hover:underline font-semibold">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignUp;
