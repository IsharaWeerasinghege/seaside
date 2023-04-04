import React, {useEffect, useState} from 'react';
import DashboardItem from "../elements/DashboardItem";
import {FaBook, FaBookmark, FaUsers} from "react-icons/fa";
import axios from "axios";
import CrewTable from "../tables/CrewTable";
import ReservationTable from "../tables/ReservationTable";
import {GiSailboat, GiShoonerSailboat} from "react-icons/gi";
import {IoMdBoat} from "react-icons/io";
import {RiSailboatFill} from "react-icons/ri";
import YachtTable from "../tables/yachtTable";
import {MdFeed} from "react-icons/md";
import FeedbackTable from "../tables/FeedbackTable";
import SupplierTable from "../tables/SupplierTable";


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [role, setRole] = useState(localStorage.getItem('role'));

    useEffect(() => {
        if (role === 'admin_crew') {
            getMembers();
        }

        if (role === 'admin_rhm') {
           getReservations();
        }

        if (role === 'admin_fleet') {
            getFleet();
        }

        if (role === 'admin_feed') {
            getFeedbacks();
        }

        if (role === 'admin_shm') {
            getSuppliers();
        }

    }, []);

    async function getFeedbacks() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/feedback/list`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })

            setData(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function getMembers() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/crew/list`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });

            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getReservations() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/reservation/list`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });

            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getFleet() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/yacht/list`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })

            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getSuppliers() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/supplier/list`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })

            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {role === 'admin_crew' && (
                <>
                <div className={'flex justify-between gap-5 mb-8'}>
                    <DashboardItem icon={<FaUsers/>} title={'Total Staff'} count={data.length}/>
                    <DashboardItem icon={<FaUsers/>} title={'Branch Galle'}
                                   count={data.filter(item => item.branch === 'galle').length}/>
                    <DashboardItem icon={<FaUsers/>} title={'Total Trincomalee'}
                                   count={data.filter(item => item.branch === 'trincomalee').length}/>
                    <DashboardItem icon={<FaUsers/>} title={'Total Chilaw'} count={data.filter(item => item.branch === 'chilaw').length}/>
                </div>
                    <div className="bg-white shadow-lg p-4 rounded">
                        <h2 className={'font-semibold text-lg mb-4'}>Crew Members</h2>
                            <CrewTable crew={data.slice(0, 4)} dashboard/>
                    </div>

                </>
            )}

            {role === 'admin_shm' && (
                <>
                    <div className={'flex justify-between gap-5 mb-8'}>
                        <DashboardItem icon={<FaUsers/>} title={'Total Supplier'} count={data.length}/>
                        <DashboardItem icon={<FaUsers/>} title={'Branch Galle'}
                                       count={data.filter(item => item.location === 'galle').length}/>
                        <DashboardItem icon={<FaUsers/>} title={'Total Trincomalee'}
                                       count={data.filter(item => item.location === 'trincomalee').length}/>
                        <DashboardItem icon={<FaUsers/>} title={'Total Chilaw'} count={data.filter(item => item.location === 'chilaw').length}/>
                    </div>
                    <div className="bg-white shadow-lg p-4 rounded">
                        <h2 className={'font-semibold text-lg mb-4'}>Crew Members</h2>
                        <SupplierTable supplier={data.slice(0,6)}  dashboard/>
                    </div>

                </>
            )}

            {role === 'admin_rhm' && (
                <>
                    <div className={'flex justify-between gap-5 mb-8'}>
                        <DashboardItem icon={<FaBook/>} title={'Total Reservation'} count={data.length}/>
                        <DashboardItem icon={<FaBookmark/>} title={'Pending'}
                                       count={data.filter(item => item.status === 'pending').length}/>
                        <DashboardItem icon={<FaBookmark/>} title={'Confirmed'}
                                       count={data.filter(item => item.status === 'confirmed').length}/>
                        <DashboardItem icon={<FaBookmark/>} title={'Rejected'} count={data.filter(item => item.status === 'rejected').length}/>
                    </div>
                    <div className="bg-white shadow-lg p-4 rounded">
                        <h2 className={'font-semibold text-lg mb-4'}>Pending Reservation</h2>
                       <ReservationTable tableData={data.filter(item => item.status === 'pending').slice(0, 7)} dashboard/>
                    </div>

                </>
            )}

            {role === 'admin_fleet' && (
                <>
                    <div className={'flex justify-between gap-5 mb-8'}>
                        <DashboardItem icon={<GiSailboat/>} title={'Total Yachts'} count={data.length}/>
                        <DashboardItem icon={<IoMdBoat/>} title={'Boats'}
                                       count={data.filter(item => item.type === 'boat').length}/>
                        <DashboardItem icon={<GiShoonerSailboat/>} title={'Ships'}
                                       count={data.filter(item => item.type === 'ship').length}/>
                        <DashboardItem icon={<RiSailboatFill/>} title={'Catamaran'} count={data.filter(item => item.type === 'catamaran').length}/>
                    </div>
                    <div className="bg-white shadow-lg p-4 rounded">
                        <h2 className={'font-semibold text-lg mb-4'}>Fleet Management</h2>
                        <YachtTable  yachts={data.slice(0, 5)} dashboard/>
                    </div>

                </>
            )}

            {role === 'admin_feed' && (
                <>
                    <div className={'flex justify-between gap-5 mb-8'}>
                        <DashboardItem icon={<MdFeed/>} title={'Total Feedback'} count={data.length}/>
                        <DashboardItem icon={<MdFeed/>} title={'Pending Feedback'}
                                       count={data.filter(item => item.status === 'pending').length}/>
                        <DashboardItem icon={<MdFeed/>} title={'Resolved Feedback'}
                                       count={data.filter(item => item.status === 'resolved').length}/>
                        <DashboardItem icon={<MdFeed/>} title={'Rejected Feedback'} count={data.filter(item => item.status === 'rejected').length}/>
                    </div>
                    <div className="bg-white shadow-lg p-4 rounded">
                        <h2 className={'font-semibold text-lg mb-4'}>Pending Feedback</h2>
                        <FeedbackTable tableData={data.filter(item => item.status === 'pending').slice(0, 5)} dashboard/>
                    </div>

                </>
            )}
        </div>
    )
}

export default Dashboard;