import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useRoleGuard from '../../hooks/useRoleGuard';
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage';
import PageUpperContent from '../../components/DashPages/PageUpperContent';
import DefultButton from '../../components/Buttons/DefultButton';

const ViewEvent = () => {
    const { id } = useParams()

    const navigate = useNavigate();
    const isAllowed = useRoleGuard(['dvc', 'admin', 'user']);
    if (!isAllowed) return null;

    const email = secureLocalStorage.getItem('loginE');
    const role = secureLocalStorage.getItem('loginR');
    const token = localStorage.getItem('login');

    const [eventdata, seteventdate] = useState([])

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
                seteventdate(res.data.Result);
            } catch (err) {
                console.error('Error fetching events:', err);
            }
        };

        fetchEvents();
    }, [role, email]);


    return (
        <div>
            <PageUpperContent title={`View Event: ${id}`} />

            <a href="/Dashboard/Events">
                <DefultButton
                    btntype={'button'}
                    text='Back'
                />
            </a>

            <div className="mt-4 bg-white p-8 rounded-xl shadow-xl border border-gray-200"></div>
        </div>
    )
}

export default ViewEvent