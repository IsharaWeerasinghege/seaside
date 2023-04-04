import React, {useEffect, useState} from 'react';
import {FaMapMarkerAlt, FaUsers} from "react-icons/fa";
import {Link} from "react-router-dom";
import axios from "axios";
import {setYacht} from "../store/fleetSlice";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "@material-ui/lab";

const Yachts = () => {
    const dispatch = useDispatch();
    const {yacht} = useSelector(state => state.yacht);
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        console.log(location, date, type, search)
        getYachts();
    }, [location, date   , type, search]);


    async function getYachts() {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/yacht/filter`, {location, date, type, search});
            dispatch(setYacht(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = yacht.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (event, value) => {
        setCurrentPage(value);
    }


    return (
        <div className={'container my-8 mx-auto'}>
            <div className={'bg-white rounded-lg px-8 py-3 w-full shadow-lg flex justify-around'}>
                <div className={'flex gap-3'}>
                    <label htmlFor="">Location :</label>
                    <select
                        name="location"
                        id="location"
                        className={'outline-none border-none w-32'}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value={''} selected>All</option>
                        <option value="galle">Galle</option>
                        <option value="chilaw">Chilaw</option>
                        <option value="trincomalee">Trincomalee</option>
                    </select>
                </div>
                <div className={'flex gap-3'}>
                    <label htmlFor="">Check Date :</label>
                    <input type="date"
                           className={'outline-none border-none w-32'}
                            onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className={'flex gap-3'}>
                    <label htmlFor="">Type :</label>
                    <select name="guests"
                            id="guests" className={'outline-none border-none w-32'}
                            onChange={(e) => setType(e.target.value)}
                    >
                        <option selected value={''}>All</option>
                        <option value="boat">Boats</option>
                        <option value="catamaran">Catamarans</option>
                        <option value="ship">Ships</option>
                    </select>
                </div>
                <div className={'flex gap-3'}>
                    <label htmlFor="">Search :</label>
                    <input type="text"
                            className={'outline-none border-none w-32'}
                            onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>


            <div className={'grid grid-cols-4 gap-4 mt-8'}>
                {currentItems.map((yacht, index) => (
                    <div key={index} className={'bg-white rounded-lg shadow-lg'}>
                        <img src={`http://localhost:3001/assets/${yacht.image}`} alt={yacht.name}
                             className={'p-1 rounded-lg w-full h-44 object-cover'}/>
                        <div className={'px-2 mb-4'}>
                            <h2 className={'text-lg font-bold text-gray-600'}>{yacht.name}</h2>
                            <p className={'text-sm text-gray-500 flex items-center gap-2 capitalize'}>
                                <FaMapMarkerAlt/>
                                {yacht.location} |
                                <FaUsers/>
                                {yacht.capacity} Guests
                            </p>
                            <div className={'my-2 flex justify-between items-center'}>
                                <h4 className={'font-semibold text-lg'}>from $ {yacht.price} Per Day</h4>
                                <Link
                                    to={`/rent/${yacht._id}`}
                                    className={' bg-gray-900 text-white py-1.5 px-4 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out'}
                                >
                                    Rent Now
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            <div className={'flex justify-center my-4'}>
                <Pagination count={Math.ceil(yacht.length / itemsPerPage)} page={currentPage} onChange={paginate}/>
            </div>


        </div>
    )
}

export default Yachts;