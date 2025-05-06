import React, { useState } from 'react';
import useRoleGuard from '../../hooks/useRoleGuard';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageUpperContent from '../../components/DashPages/PageUpperContent';
import { BsPlusCircleFill } from 'react-icons/bs';
import DefultInput from '../../components/Form/DefultInput';
import TextAreaInput from '../../components/Form/TextAreaInput';
import FileInput from '../../components/Form/FileInput';
import DefultButton from '../../components/Buttons/DefultButton';

const CreateEvent = () => {
    const navigate = useNavigate();
    const isAllowed = useRoleGuard(['dvc', 'admin', 'user']);
    if (!isAllowed) return null;

    const email = secureLocalStorage.getItem('loginE');
    const token = localStorage.getItem('login');

    const [eventData, setEventData] = useState({
        title: '',
        date: '',
        description: '',
        link: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setEventData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', eventData.title);
            formData.append('date', eventData.date);
            formData.append('description', eventData.description);
            formData.append('link', eventData.link);
            formData.append('image', eventData.image);

            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/event/createEvent/${email}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.Status === 'Success') {
                alert(res.data.Message);
                navigate('/Dashboard/Events');
            } else {
                alert(res.data.Error || 'Event creation failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        }
    };

    return (
        <div>
            <PageUpperContent title="Create New Event" icon={BsPlusCircleFill} />
            <div className="bg-white rounded-xl shadow-xl p-8">
                <form onSubmit={handleCreateEvent}>
                    <DefultInput
                        label="Enter Event Title"
                        name="title"
                        value={eventData.title}
                        required
                        placeholder="Event Title"
                        onChange={handleChange}
                    />

                    <DefultInput
                        type="date"
                        label="Enter Event Date"
                        name="date"
                        value={eventData.date}
                        required
                        placeholder="Event Date"
                        onChange={handleChange}
                    />

                    <TextAreaInput
                        label="Enter Event Description"
                        name="description"
                        value={eventData.description}
                        placeholder="Event Description"
                        required
                        onChange={handleChange}
                    />

                    <DefultInput
                        label="Enter Event Link"
                        name="link"
                        value={eventData.link}
                        required
                        placeholder="Event Link"
                        onChange={handleChange}
                    />

                    <FileInput
                        label="Enter Event Image"
                        name="image"
                        required
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <DefultButton btntype="submit" text="Create New Event" />
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
