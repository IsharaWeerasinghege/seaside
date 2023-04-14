import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Pagination} from "@material-ui/lab";
import PopupModal from "../components/PoppupModel";
import {IoCloseCircleOutline} from "react-icons/io5";
import * as yup from "yup";
import {Formik} from "formik";


const Maintenance = () => {
    const initialState = {
        latestDate: '',
        nextDate: '',
        description: '',
    }

    const [yacht, setYacht] = useState([]);
    const [selectedYacht, setSelectedYacht] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isData, setIsData] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const maintenanceValidationSchema = yup.object().shape({
        latestDate: yup.date().required('Required'),
        nextDate: yup.date().required('Required'),
        description: yup.string().required('Required'),
    });

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    useEffect(() => {
        if (!isData) {
            async function getYachts() {
                await axios.get(`${process.env.REACT_APP_BASE_URL}/yacht/maintenance/list`).then(
                    (response) => {
                        setYacht(response.data);
                        setIsData(true);
                        console.log(response.data)
                    }
                ).catch((error) => {
                        console.log(error);
                    }
                )
            }

            getYachts();
        }
    }, [isData, submitHandler]);


    function handleUpdate(id) {
        setSelectedYacht(id);
        handleOpenModal();
    }

    async function submitHandler(values) {
        console.log(values, selectedYacht)
        await axios.post(`${process.env.REACT_APP_BASE_URL}/yacht/maintenance/add`, {...values, id: selectedYacht}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(
            (response) => {
                handleCloseModal();
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
                        <Formik
                            initialValues={initialState}
                            onSubmit={submitHandler}
                            validationSchema={maintenanceValidationSchema}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className={'mb-4'}>
                                        <label htmlFor="latestDate"
                                               className={'block mb-2 text-sm font-medium text-gray-700'}>Latest
                                            Date</label>
                                        <input
                                            type="date"
                                            id="latestDate"
                                            name="latestDate"
                                            className={'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'}
                                            onChange={formik.handleChange}
                                            value={formik.values.latestDate}
                                        />
                                        {formik.errors.latestDate && formik.touched.latestDate ? (
                                            <div className={'text-red-500 text-sm'}>{formik.errors.latestDate}</div>
                                        ) : null}
                                    </div>
                                    <div className={'mb-4'}>
                                        <label htmlFor="nextDate"
                                               className={'block mb-2 text-sm font-medium text-gray-700'}>Next
                                            Date</label>
                                        <input
                                            type="date"
                                            id="nextDate"
                                            name="nextDate"
                                            className={'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'}
                                            onChange={formik.handleChange}
                                            value={formik.values.nextDate}
                                        />
                                        {formik.errors.nextDate && formik.touched.nextDate ? (
                                            <div className={'text-red-500 text-sm'}>{formik.errors.nextDate}</div>
                                        ) : null}
                                    </div>
                                    <div className={'mb-4'}>
                                        <label htmlFor="description"
                                               className={'block mb-2 text-sm font-medium text-gray-700'}>Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            className={'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'}
                                            onChange={formik.handleChange}
                                            value={formik.values.description}
                                        />
                                        {formik.errors.description && formik.touched.description ? (
                                            <div className={'text-red-500 text-sm'}>{formik.errors.description}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <button
                                            className={'bg-blue-500 text-white px-4 py-2 rounded w-full shadow-md hover:bg-blue-800'}
                                            type={'submit'}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </PopupModal>
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
                <h1 className={'font-semibold text-xl mb-2'}>Maintenance</h1>
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
                                Latest Date
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Next Date
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
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
                            <tr key={yacht._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {yacht.Name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{yacht?.latestMaintenanceDate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{yacht?.nextMaintenanceDate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{yacht?.maintenanceDescription}</div>
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

export default Maintenance;