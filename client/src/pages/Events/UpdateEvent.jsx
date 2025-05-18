import React, { useState } from 'react';
import useRoleGuard from '../../hooks/useRoleGuard';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DefultInput from '../../components/Form/DefultInput';
import TextAreaInput from '../../components/Form/TextAreaInput';
import FileInput from '../../components/Form/FileInput';
import DefultButton from '../../components/Buttons/DefultButton';

const UpdateEvent = ({ eventID }) => {
    const navigate = useNavigate();
    const isAllowed = useRoleGuard(['dvc', 'admin', 'user']);
    if (!isAllowed) return null;

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

    const handleUpdateEvent = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            if (eventData.title.trim()) formData.append('title', eventData.title);
            if (eventData.date.trim()) formData.append('date', eventData.date);
            if (eventData.description.trim()) formData.append('description', eventData.description);
            if (eventData.link.trim()) formData.append('link', eventData.link);
            if (eventData.image) formData.append('image', eventData.image);

            const res = await axios.put(
                `${import.meta.env.VITE_APP_API}/event/updateEvent/${eventID}`,
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
                alert(res.data.Error || 'Event update failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        }
    };

    return (
        <div className='bg-white border border-gray-200 p-8 rounded-xl shadow-xl mt-4'>
            <h1 className="text-xl font-semibold text-gray-500">Update Event : {eventID}</h1>

            <div className="mt-8">
                <form onSubmit={handleUpdateEvent}>
                    <DefultInput
                        label="Enter Event Title"
                        name="title"
                        value={eventData.title}
                        placeholder="Event Title"
                        onChange={handleChange}
                    />

                    <DefultInput
                        type="date"
                        label="Enter Event Date"
                        name="date"
                        value={eventData.date}
                        placeholder="Event Date"
                        onChange={handleChange}
                    />

                    <TextAreaInput
                        label="Enter Event Description"
                        name="description"
                        value={eventData.description}
                        placeholder="Event Description"
                        onChange={handleChange}
                    />

                    <DefultInput
                        label="Enter Event Link"
                        name="link"
                        value={eventData.link}
                        placeholder="Event Link"
                        onChange={handleChange}
                    />

                    <FileInput
                        label="Upload Event Image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    <DefultButton btntype="submit" text="Update Event" />
                </form>
            </div>
        </div>
    );
};

export default UpdateEvent;
