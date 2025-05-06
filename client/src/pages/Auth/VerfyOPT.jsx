import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import DefultButton from '../../components/Buttons/DefultButton'
import DefultInput from '../../components/Form/DefultInput'
import { MdOutlineClose } from 'react-icons/md'


const VerfyOPT = () => {
    const navigate = useNavigate()
    const email = secureLocalStorage.getItem('email')
    const [errorMsg, setErrorMsg] = useState(null);
    const [otpdata, setotpdata] = useState({
        otp: ''
    })

    const handleChange = (e) => {
        setotpdata({ ...otpdata, [e.target.name]: e.target.value });
    };

    const headleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + `/auth/verifyOPT/${email}`, otpdata)
                .then(res => {
                    if (res.data.Status === "Success") {
                        setErrorMsg({ type: "success", message: res.data.Message });
                        localStorage.clear()
                        setTimeout(() => {
                            navigate('/');
                        }, 2000);
                    }
                    else {
                        setErrorMsg({ type: "error", message: res.data.Error });
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    }


    if (email) {
        return (
            <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-3xl shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>

                {errorMsg && (
                    <div
                        className={`${errorMsg.type === 'error' ? 'text-red-600 bg-red-300/20' : 'text-green-600 bg-green-300/20'
                            } p-4 rounded-xl mb-4 transition-all duration-300 ease-in-out transform`}
                        style={{ transform: errorMsg ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.5s ease-out' }}
                    >
                        <div className="flex justify-between">
                            <div className="flex">
                                <p className="font-bold">{errorMsg.type === 'error' ? 'Error :' : 'Success :'}</p>
                                <p className="pl-2">{errorMsg.message}</p>
                            </div>
                            <div className="mt-0">
                                <MdOutlineClose className='h-6 w-auto cursor-pointer' onClick={() => setErrorMsg(null)} />
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={headleVerifyOTP}>
                    <DefultInput
                        label="Enter OTP (OTP is send to your registation email address)"
                        type="text"
                        name="otp"
                        value={otpdata.otp}
                        onChange={handleChange}
                        placeholder="Enter your OTP"
                        required
                    />
                    <div className="text-center mt-6">
                        <DefultButton text="Verify OTP" btntype="submit" />
                    </div>
                </form>
            </div>
        )
    }
    else {
        useEffect(() => {
            if (!email) {
                localStorage.clear()
                navigate('/register', { replace: true });
            }
        }, []);

    }

}

export default VerfyOPT