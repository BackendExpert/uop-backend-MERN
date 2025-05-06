import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AllUsers = () => {
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
                                            data.emailVerfy === true ?
                                                <div className="text-green-500 font-semibold">Verfied</div>
                                                :
                                                <div className="text-red-500 font-semibold">Not-Verfied</div>
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

export default AllUsers