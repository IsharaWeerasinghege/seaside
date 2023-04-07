import React, {useEffect, useState} from 'react';
import {VscEmptyWindow} from "react-icons/vsc";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setUser} from "../store/userSlice";
import UserReservationTable from "../tables/UserReservationTable";

const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.user);

    const [reservation, setReservation] = useState([]);
    const [booking, setBooking] = useState([]);

    const user = localStorage.getItem('user');

    if (!user) {
        window.location.href = '/login';
    }

    async function getProfile() {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile?id=${user}`);
            dispatch(setUser(data));
        } catch (error) {
            console.log(error);
            dispatch(setUser(null));
        }
    }

    async function getReservationByUser() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/reservation/list/${localStorage.getItem('user')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setReservation(response.data)

        } catch (err) {
            console.log(err.message())
        }
    }

    async function getBookingByUser() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/booking/list/${localStorage.getItem('user')}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setBooking(response.data)

        } catch (err) {
            console.log(err.message())
        }
    }


    useEffect(() => {
        getProfile();
        getReservationByUser();
        getBookingByUser();
    }, [])

    // pagination
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage] = useState(7);
    //
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = reservation.slice(indexOfFirstItem, indexOfLastItem);
    // const currentBookings = booking.slice(indexOfFirstItem, indexOfLastItem);
    //
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={'container mx-auto flex justify-between gap-5 my-8'}>
            <div className={'w-3/12 bg-white p-4 rounded-lg shadow-lg'}>
                <h1 className={'text-xl font-bold text-center'}>Profile</h1>
                <div className={'text-neutral-600 p-2'}>
                    <img
                        src="https://res.cloudinary.com/dua2ttada/image/upload/v1677892661/Hf768b4fa794e44bfb7cc86e4a528a035h_r3ehlo.png"
                        alt="profile"
                        className={'w-32 h-32 rounded-full mx-auto my-6'}
                    />
                    <ul>
                        <li className={'flex gap-2'}>
                            <p className={'w-16 capitalize'}>Name</p>
                            <p>:</p>
                            <p>{userData?.name}</p>
                        </li>
                        <li className={'flex gap-2'}>
                            <p className={'w-16 capitalize'}>Email</p>
                            <p>:</p>
                            <p>{userData?.email}</p>
                        </li>
                        <li className={'flex gap-2'}>
                            <p className={'w-16 capitalize'}>Phone</p>
                            <p>:</p>
                            <p>{userData?.phone}</p>
                        </li>
                        <li className={'flex gap-2'}>
                            <p className={'w-16 capitalize'}>Address</p>
                            <p>:</p>
                            <p>{userData?.address}</p>
                        </li>

                    </ul>

                </div>
            </div>
            <div className={'flex-1 bg-white p-4 rounded-lg shadow-lg'}>
                <h1 className={'text-xl font-bold mb-2'}>Orders</h1>

                {reservation || booking ? (
                    <div className={'w-full h-auto flex justify-center items-center flex-col py-2'}>
                        {reservation.length > 0 ? (
                            <div
                                className={'w-full mb-4'}
                            >
                                <h2 className={
                                    ' font-semibold'
                                }>Yachts</h2>
                                <UserReservationTable tableData={reservation.slice(0, 10)}/>
                            </div>
                        ) : null
                        }

                        {booking && booking.length > 0 ? (
                            <div
                                className={'w-full mb-4'}
                            >
                                <h2 className={
                                    'font-semibold'
                                }>Packages</h2>
                                <UserReservationTable pack tableData={booking.slice(0, 10)}/>
                            </div>
                        ) : null
                        }
                    </div>
                ) : (
                    <div className={'w-full h-full flex justify-center items-center flex-col '}>
                        <VscEmptyWindow className={'text-5xl text-gray-400 mb-2'}/>
                        <h1 className={'text-lg capitalize'}>no any booking</h1>
                    </div>
                )}

                {/*<div className={'w-full flex justify-center my-2'}>*/}
                {/*    <Pagination count={Math.ceil(reservation.length / itemsPerPage)} page={currentPage}*/}
                {/*                onChange={(e, value) => paginate(value)}/>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default Profile;