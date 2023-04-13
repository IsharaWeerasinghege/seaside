import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import {Input} from "../elements";
import {MdEmojiFoodBeverage, MdFastfood} from "react-icons/md";
import {GiWaterBottle} from "react-icons/gi";
import * as yup from "yup";
import {useParams} from "react-router-dom";
import axios from "axios";
import {IoMdAdd, IoMdRemove} from "react-icons/io";
import {Pagination} from "@material-ui/lab";

const initialState = {
    food: '',
    beverage: '',
    water: ''
}
const UpdateInventory = () => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [dataArray, setDataArray] = useState([]);
    const [updateType, setUpdateType] = useState('');
    const [isData, setIsData] = useState(false);

    const inventoryValidationSchema = yup.object().shape({
        food: yup.number().required('Food is required'),
        beverage: yup.number().required('Beverage is required'),
        water: yup.number().required('Water is required')
    });

    useEffect(() => {
        if (!isData) {
            async function getInventory() {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/inventory/list/${id}`,
                        {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                    setData(response.data);
                    setDataArray(response.data.inventory);
                    setIsData(true);
                } catch (error) {
                    console.log(error);
                }
            }
            getInventory();
        }
    }, [isData, id, addInventory]);

    async function addInventory(values) {

        if (updateType === 'remove') {
           values  = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, -value]));
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/inventory/update`,
                {...values, yachtId: id},
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
           setData(response.data);
        } catch (error) {
            console.log(error);
        }

        setIsData(false);
    }

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataArray.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
            <h1 className="text-2xl font-semibold mb-2">Add Inventory +</h1>
            <div>
                <Formik
                    initialValues={initialState}
                    onSubmit={
                        addInventory
                    }
                    validationSchema={inventoryValidationSchema}
                >
                    {(formik) => (
                        <Form>
                            <div className="flex justify-center mt-2 gap-2">
                                <Input icon={<MdFastfood/>} placeholder={'Food'} name={'food'} min={0}
                                       type={'number'}/>
                                <Input icon={<MdEmojiFoodBeverage/>} placeholder={'Beverage'} min={0}
                                       name={'beverage'}
                                       type={'number'}/>
                                <Input icon={<GiWaterBottle/>} placeholder={'Water'} name={'water'} min={0}
                                       type={'number'}/>
                                <div className={'flex flex-row h-12 gap-2'}>
                                    <button className={'bg-blue-600 text-white w-12 text-2xl rounded-md grid place-items-center shadow-lg'}
                                            type={'submit'}
                                            onClick={() => setUpdateType('add')}
                                            title={'Add Inventory'}
                                    >
                                        <IoMdAdd/>
                                    </button>
                                    <button className={'bg-red-600 text-white w-12 text-2xl rounded-md grid place-items-center shadow-lg'}
                                            type={'submit'}
                                            onClick={() => setUpdateType('remove')}
                                            title={'Remove Inventory'}
                                    >
                                        <IoMdRemove/>
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className=" mt-2">
                <div>
                   <h1 className={'font-semibold'}>{data?.name}</h1>
                    <div>
                        <table className={
                            "table-auto w-full text-left whitespace-nowrap bg-white divide-y divide-gray-200"
                        }>
                            <thead>
                            <tr
                                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 text-center">
                                <th className={'px-4 py-2'}>
                                Date
                                </th>
                                <th>
                                    Food
                                </th>
                                <th>
                                    Beverage
                                </th>
                                <th>
                                    Water
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems?.map((item, index) => (
                                <tr key={index} className={'text-center'}>
                                    <td className={'px-4 py-2'}>{item.createdAt.slice(0, 10)}</td>
                                    <td className={'px-4 py-2'}>{item.food}</td>
                                    <td className={'px-4 py-2'}>{item.beverage}</td>
                                    <td className={'px-4 py-2'}>{item.water}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-2">
                        <Pagination shape={'rounded'} size={'small'}
                                    count={Math.ceil(dataArray.length / itemsPerPage)}
                                    page={currentPage} onChange={
                            (event, value) => setCurrentPage(value)
                        }/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateInventory;