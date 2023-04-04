import React, {useState} from 'react';
import {GiSailboat} from "react-icons/gi";
import {Link} from "react-router-dom";
import {FaUser} from "react-icons/fa";


const Header = () => {
    const [user, setUser] = useState(localStorage.getItem('name'));
    const [role, setRole] = useState(localStorage.getItem('role'));
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        window.location.href = '/';
    }

    return (
        <div className="w-full h-12 bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex items-center h-full justify-between font-serif">
                <Link to={'/'} className={"flex flex-row items-center gap-2 text-2xl font-semibold text-slate-900"}>
                    <GiSailboat/>
                    <h1>Seaside</h1>
                </Link>

                <ul className={'flex items-center gap-6'}>

                        <li>
                            <Link to={'/'} className={"text-slate-900 hover:text-slate-700 text-[15px] font-semibold"}>
                                Home
                            </Link>
                        </li>

                    <li>
                        <Link to={'/yachts'} className={"text-slate-900 hover:text-slate-700 text-[15px] font-semibold"}>
                            Rent Yacht
                        </Link>
                    </li>

                    <li>
                        <a href={'/#about'} className={"text-slate-900 hover:text-slate-700 text-[15px] font-semibold"}>
                            About
                        </a>
                    </li>

                    <li>
                        <a href={'/#contact'} className={"text-slate-900 hover:text-slate-700 text-[15px] font-semibold"}>
                            contact
                        </a>
                    </li>

                </ul>

                {user ? (
                    <div className={'relative'}>
                        <div className={'flex items-center gap-2 cursor-pointer'} onClick={() => setIsOpen((prevState) => !prevState)}>
                            <FaUser/>
                            {user}
                        </div>
                        {isOpen && (
                            <div className={'absolute top-10 right-0 bg-white shadow-lg rounded py-3 px-4 w-44 text-center'}>
                                {role !== 'user' && (
                                    <Link to={'/admin'} className={'block text-slate-900 hover:text-slate-700 text-[15px] font-semibold border-b py-2'} onClick={() => setIsOpen(false)}>
                                        Dashboard
                                    </Link>
                                )}
                                <Link to={'/profile'} className={'block text-slate-900 hover:text-slate-700 text-[15px] font-semibold border-b py-2'} onClick={() => setIsOpen(false)}>
                                    Profile
                                </Link>
                                <div to={'/logout'} className={'block text-slate-900 hover:text-slate-700 text-[15px] font-semibold py-2 cursor-pointer'} onClick={() => handleLogout()}>
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to={'/login'} className={'bg-neutral-600 text-white px-4 py-0.5 rounded'}>
                        Login
                    </Link>
                )}

            </div>
        </div>
    )
}

export default Header;