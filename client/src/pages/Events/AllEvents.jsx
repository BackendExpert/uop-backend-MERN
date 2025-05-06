import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useRoleGuard from '../../hooks/useRoleGuard';
import PageUpperContent from '../../components/DashPages/PageUpperContent';
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage';
import { formatDate } from '../../utils/helper';


const AllEvents = () => {
    const navigate = useNavigate();
    const isAllowed = useRoleGuard(['dvc', 'admin', 'user']);
    if (!isAllowed) return null;

    const role = secureLocalStorage.getItem('loginR');
    const email = secureLocalStorage.getItem('loginE')
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


    const toggleAccountActive = async (value) => {
        try {
            const res = await axios.patch(import.meta.env.VITE_APP_API + `/event/toggleAcceptEvent/${value}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (res.data.Status === 'Success') {
                alert(res.data.Message);
                window.location.reload();
            } else {
                alert(res.data.Error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='bg-white rounded-xl shadow-xl p-8'>
            <table className="w-full">
                <thead>
                    <tr className='h-12 border-b border-blue-200 text-blue-500'>
                        <th className='font-semibold'>#</th>
                        <th className='font-semibold'>Event Name</th>
                        <th className='font-semibold'>Event Add By</th>
                        <th className='font-semibold'>Event Date</th>
                        <th className='font-semibold'>Event Active</th>
                        <th className='font-semibold'>Event Accepted</th>
                        <th className='font-semibold'>Acticon</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        eventdata.map((data, index) => {
                            return (
                                <tr className='h-12 border-b border-blue-200 text-center' key={index}>
                                    <td className='text-blue-500 font-semibold'>{index + 1}</td>
                                    <td>{data.title}</td>
                                    <td>{data.addby.username}</td>
                                    <td>{formatDate(data.date)}</td>
                                    <td>
                                        {
                                            data.isActive === true ?
                                                <div className="font-semibold text-green-500">Active</div>
                                                :
                                                <div className="font-semibold text-red-500">Deactive</div>
                                        }
                                    </td>

                                    <td>
                                        {
                                            data.isAccepted === true ?
                                                <div className="font-semibold text-green-500">Accepted</div>
                                                :
                                                <div className="font-semibold text-red-500">No-Accepted</div>
                                        }
                                    </td>
                                    <td>
                                        {
                                            role === 'dvc' || role === 'admin' ?
                                                <div className="flex">
                                                    {
                                                        data.isAccepted === false ?
                                                            <button onClick={() => toggleAccountActive(data._id)} className='bg-green-500 px-4 py-1 duration-500 hover:bg-green-600 text-white rounded-full'>Accept</button>
                                                            :
                                                            <button  onClick={() => toggleAccountActive(data._id)} className='bg-red-500 px-4 py-1 duration-500 hover:bg-red-600 text-white rounded-full'>Reject</button>
                                                    }


                                                    <Link to={`/Dashboard/ViewEvent/${data._id}`}>
                                                        <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
                                                            More
                                                        </button>
                                                    </Link>
                                                </div>
                                                :
                                                <div className="">
                                                    <Link to={`/Dashboard/ViewEvent/${data._id}`}>
                                                        <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
                                                            More
                                                        </button>
                                                    </Link>
                                                </div>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllEvents