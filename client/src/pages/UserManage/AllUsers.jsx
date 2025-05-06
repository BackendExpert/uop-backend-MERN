import React, { useEffect, useState } from 'react'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage';
import { Link, useNavigate } from 'react-router-dom';


const AllUsers = () => {
    const navigate = useNavigate()
    const username = secureLocalStorage.getItem('loginU');
    const role = secureLocalStorage.getItem('loginR');
    const email = secureLocalStorage.getItem('loginE');
    const [userdata, setuserdata] = useState([])
    const token = localStorage.getItem('login')

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/user/allusers', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => setuserdata(res.data.Result))
            .catch(err => console.log(err))
    }, [])

    const toggeleAccoutAcitve = async (value) => {
        try{
            const res = await axios.patch(import.meta.env.VITE_APP_API + `/user/updateUserStatus/${value}`,{}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(res => {
                if(res.data.Status === 'Success'){
                    alert(res.data.Message)
                    window.location.reload()
                }
                else{
                    alert(res.data.Error)
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className='bg-white p-8 rounded-xl shadow-xl'>
            <table className="w-full">
                <thead>
                    <tr className='h-12 border-b border-blue-200 uppercase text-blue-500'>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Faculty</th>
                        <th>Verify Email</th>
                        <th>Active Account</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userdata.map((data, index) => {
                            return (
                                <tr className='h-12 border-b border-blue-200 text-center' key={index}>
                                    <td className='font-semibold text-blue-600'>{index + 1}</td>
                                    <td>{data.username}</td>
                                    <td>{data.email}</td>
                                    <td>{data.faculty}</td>
                                    <td className='font-semibold text-blue-600 uppercase text-sm'>{data.role}</td>
                                    <td>
                                        {
                                            data.emailVerfy === true ?
                                                <div className="text-green-500 font-semibold">Verfied</div>
                                                :
                                                <div className="text-red-500 font-semibold">Not-Verfied</div>
                                        }
                                    </td>
                                    <td>
                                        {
                                            data.isActive === true ?
                                                <div className="text-green-500 font-semibold">Active</div>
                                                :
                                                <div className="text-red-500 font-semibold">Deactive</div>
                                        }
                                    </td>
                                    <th>
                                        <div className="">
                                            <div className="">
                                                {
                                                    data.email === email ?
                                                        <div className="text-center text-gray-400">Current User</div>
                                                        :
                                                        <div className="">
                                                            <div className="flex ml-4 flex-end">
                                                                <div className="">
                                                                    {
                                                                        data.isActive === true ?
                                                                            <h1 onClick={() => toggeleAccoutAcitve(data.email)} className="cursor-pointer p-1 px-2 bg-white border border-red-500 text-red-500 rounded-full duration-500 hover:bg-red-600 hover:text-white">Deactivate</h1>
                                                                            :
                                                                            <h1 onClick={() => toggeleAccoutAcitve(data.email)} className="cursor-pointer p-1 px-2 bg-white border border-green-500 text-green-500 rounded-full duration-500 hover:bg-green-600 hover:text-white">Activate</h1>
                                                                    }
                                                                </div>
                                                                <div className="">
                                                                    <Link>
                                                                        <button className='bg-blue-500 p-1 px-2 ml-4 rounded text-white'>
                                                                            More
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers