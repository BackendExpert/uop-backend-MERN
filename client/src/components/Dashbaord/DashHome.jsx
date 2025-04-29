import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import DashSide from './DashSide'
import DashNav from './DashNav'
import DashFooter from './DashFooter'
import { FaArrowCircleRight, FaChevronCircleLeft } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
import '../../App.css'


const Dashbaord = () => {
    const navigate = useNavigate()
    const RoleUser = secureLocalStorage.getItem('loginR')
    const EmailUser = secureLocalStorage.getItem('loginE')
    const Username = secureLocalStorage.getItem('loginU')

    const [openside, setopenside] = useState(false);

    const headlemenuopen = () => {
        setopenside(!openside)
    }


    if (RoleUser !== "" || EmailUser !== "" || Username !== "") {
        return (
            <div className='w-full bg-[#f5f7fa] min-h-screen font-sans text-gray-800'>
                <div className="xl:flex">
                    <div
                        className={`shadow-xl p-0 xl:block fixed top-0 left-0 h-full bg-white z-50 xl:w-[18%] w-[75%] overflow-y-auto transform duration-500 scrollbar-thin ${openside ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
                            }`}
                    >
                        <DashSide />
                    </div>

                    <button
                        className="xl:hidden fixed top-6 left-1 z-50 bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-lg transition"
                        onClick={headlemenuopen}
                    >
                        {openside ? (
                            <MdOutlineClose className="text-white h-5 w-5" />
                        ) : (
                            <TiThMenu className="text-white h-5 w-5" />
                        )}
                    </button>

                    <div className="xl:ml-[18%] w-full">
                        <div className="xl:-ml-4">
                            <DashNav />
                        </div>
                        <div className="xl:ml-4 ml-6 py-4 mr-4">
                            <Outlet />
                        </div>
                        <div className="xl:ml-0">
                            <DashFooter />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    else {
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }
}

export default Dashbaord