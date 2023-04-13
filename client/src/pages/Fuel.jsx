import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Pagination} from "@material-ui/lab";
import PopupModal from "../components/PoppupModel";
import {IoCloseCircleOutline} from "react-icons/io5";

const Fuel = () => {

    const [yacht, setYacht] = useState([]);
    const [selectedYacht, setSelectedYacht] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isData, setIsData] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    useEffect(() => {
        if (!isData) {
            async function getYachts() {
                await axios.get(`${process.env.REACT_APP_BASE_URL}/yacht/list`).then(
                    (response) => {
                        setYacht(response.data);
                        setIsData(true);
                    }
                ).catch((error) => {
                        console.log(error);
                    }
                )
            }

            getYachts();
        }
    }, [isData]);

    function calculatePercentage(capacity, remainingFuel) {
        let percentage = (remainingFuel / capacity) * 100;

        if (percentage <= 25) {
            return "very low";
        } else if (percentage <= 50) {
            return "low";
        } else if (percentage <= 80) {
            return "normal";
        } else {
            return "full";
        }
    }

    function handleUpdate(id) {
        setSelectedYacht(id);
        handleOpenModal();
    }

    async function submitHandler() {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/yacht/refill`, {
                id: selectedYacht,
                amount: quantity
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                    console.log(response.data);
                    handleCloseModal();
                    setSelectedYacht(null);
                    setQuantity(0);
                    setIsData(false);
                }
            ).catch((error) => {
                    console.log(error);
                }
            )
    }


    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [yachtsPerPage] = useState(6);

    const indexOfLastYacht = currentPage * yachtsPerPage;
    const indexOfFirstYacht = indexOfLastYacht - yachtsPerPage;
    const currentYachts = yacht.slice(indexOfFirstYacht, indexOfLastYacht);


    return (
        <>
            <PopupModal isOpen={modalOpen} onClose={handleCloseModal}>
                <div>
                    <div
                        className={'flex justify-between items-center mb-4 w-[300px]'}
                    >
                        <h1 className={'font-semibold'}>Update</h1>
                        <button
                            onClick={handleCloseModal}
                            className={'text-gray-500'}
                        >
                            <IoCloseCircleOutline/>
                        </button>
                    </div>
                    <div>
                        <input
                            type={'number'}
                            placeholder={'Fuel Quantity'}
                            className={'border-2 border-gray-300 bg-white h-10 px-2 rounded-lg text-sm w-full mb-2 focus:outline-none'}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <div>
                            <button
                                className={'bg-blue-500 text-white px-4 py-2 rounded w-full shadow-md hover:bg-blue-800'}
                                onClick={submitHandler}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </PopupModal>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
                <h1 className={'font-semibold text-xl mb-2'}>Fuel Status</h1>
                <div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fleet Name
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fuel Type
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fuel Capacity
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fuel Remaining
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fuel Status
                            </th>
                            <th scope={'col'}
                                className={'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'}
                            >
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {currentYachts.map((yacht) => (
                            <tr key={yacht.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {yacht.name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{yacht.fuelType}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{yacht.fuelCapacity}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{yacht.totalFuelRefillAmount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {
                                        calculatePercentage(yacht.fuelCapacity, yacht.totalFuelRefillAmount) === "very low" ?
                                            <span
                                                className={'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'}>
                                            Very Low
                                        </span> :
                                            calculatePercentage(yacht.fuelCapacity, yacht.totalFuelRefillAmount) === "low" ?
                                                <span
                                                    className={'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'}>
                                                Low
                                            </span> :
                                                calculatePercentage(yacht.fuelCapacity, yacht.totalFuelRefillAmount) === "normal" ?
                                                    <span
                                                        className={'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'}>
                                                    Normal
                                                </span> :
                                                    <span
                                                        className={'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'}>
                                                    Full
                                                </span>

                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        className="text-white hover:bg-green-800 bg-green-500 px-2 py-1 shadow rounded"
                                        onClick={() => handleUpdate(yacht._id)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-2">
                    <Pagination shape={'rounded'} size={'small'}
                                count={Math.ceil(yacht.length / yachtsPerPage)}
                                page={currentPage}
                                onChange={(e, value) => setCurrentPage(value)}
                    />
                </div>
            </div>
        </>
    )
}

export default Fuel;