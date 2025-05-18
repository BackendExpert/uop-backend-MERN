import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useRoleGuard from '../../hooks/useRoleGuard';
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage';
import PageUpperContent from '../../components/DashPages/PageUpperContent';
import DefultButton from '../../components/Buttons/DefultButton';
import { formatDate } from '../../utils/helper';

const ViewEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAllowed = useRoleGuard(['dvc', 'admin', 'user']);
    if (!isAllowed) return null;

    const email = secureLocalStorage.getItem('loginE');
    const role = secureLocalStorage.getItem('loginR');
    const token = localStorage.getItem('login');

    const [eventdata, seteventdata] = useState(null); // Single event

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                let url = '';
                if (role === 'dvc' || role === 'admin') {
                    url = import.meta.env.VITE_APP_API + '/event/allevents';
                } else if (role === 'user') {
                    url = import.meta.env.VITE_APP_API + `/event/alleventsUser/${email}`;
                }
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const foundEvent = res.data.Result.find(event => event._id === id);
                seteventdata(foundEvent);
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };

        fetchEvents();
    }, [role, email, id]);

    return (
        <div>
            <PageUpperContent title={`View Event: ${id}`} />

            <a href="/Dashboard/Events">
                <DefultButton
                    btntype={'button'}
                    text='Back'
                />
            </a>

            <div className="mt-4 bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                {eventdata ? (
                    <table className='w-full'>
                        <tbody>
                            <tr className='h-12 border-b border-gray-200'>
                                <td className='font-semibold'>Event ID:</td>
                                <td>{eventdata._id}</td>
                            </tr>
                            <tr className='h-12 border-b border-gray-200'>
                                <td className='font-semibold'>Event Title:</td>
                                <td>{eventdata.title}</td>
                            </tr>
                            <tr className='h-12 border-b border-gray-200'>
                                <td className='font-semibold'>Event Description:</td>
                                <td>{eventdata.description}</td>
                            </tr>
                            <tr className='h-12 border-b border-gray-200'>
                                <td className='font-semibold'>Event Link:</td>
                                <td><a href={eventdata.link} target='_blank' className='text-blue-600 hover:underline'>Go to Link</a></td>
                            </tr>
                            <tr className='h-12 border-b border-gray-200'>
                                <td className='font-semibold'>Event Image:</td>
                                <td>
                                    <img src={`${import.meta.env.VITE_APP_API}/uploads/${eventdata.image}`} className='h-40 w-auto' alt="" />
                                </td>
                            </tr>
                            <tr className='h-12 border-b border-gray-200'>
                                <td className='font-semibold'>Event Date:</td>
                                <td>{formatDate(eventdata.date)}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Loading event details...</p>
                )}
            </div>
        </div>
    )
}

export default ViewEvent;
