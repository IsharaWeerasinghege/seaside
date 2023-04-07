import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import {Input} from "../elements";
import {MdEmojiFoodBeverage, MdFastfood} from "react-icons/md";
import {BsFuelPumpFill} from "react-icons/bs";
import {GiWaterBottle} from "react-icons/gi";
import * as yup from "yup";
import {useParams} from "react-router-dom";
import axios from "axios";

const initialState = {
    food: '',
    beverage: '',
    fuel: '',
    water: ''
}
const UpdateInventory = () => {
    const {id} = useParams();
    const [data, setData] = useState([]);

    const inventoryValidationSchema = yup.object().shape({
        food: yup.number().required('Food is required'),
        beverage: yup.number().required('Beverage is required'),
        fuel: yup.number().required('Fuel is required'),
        water: yup.number().required('Water is required')
    });

    useEffect(() => {
        async function getInventory() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/inventory/list/${id}`,
                    {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getInventory();
    }, [addInventory])

    async function addInventory(values) {

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/inventory/update`,
                {...values, yachtId: id},
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
           setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

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
                                <Input icon={<MdFastfood/>} placeholder={'Food'} name={'food'}
                                       type={'number'}/>
                                <Input icon={<MdEmojiFoodBeverage/>} placeholder={'Beverage'}
                                       name={'beverage'}
                                       type={'number'}/>
                                <Input icon={<BsFuelPumpFill/>} placeholder={'Fuel'} name={'fuel'}
                                       type={'number'}/>
                                <Input icon={<GiWaterBottle/>} placeholder={'Water'} name={'water'}
                                       type={'number'}/>
                                <div>
                                    <button className={'bg-gray-900 text-white px-4 py-2.5 mt-0.5 rounded-md'}
                                            type={'submit'}>
                                        Update
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
                                className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50">
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
                                    Fuel
                                </th>
                                <th>
                                    Water
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.inventory?.map((item, index) => (
                                <tr key={index}>
                                    <td className={'px-4 py-2'}>{item.createdAt.slice(0, 10)}</td>
                                    <td className={'px-4 py-2'}>{item.food}</td>
                                    <td className={'px-4 py-2'}>{item.beverage}</td>
                                    <td className={'px-4 py-2'}>{item.fuel}</td>
                                    <td className={'px-4 py-2'}>{item.water}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateInventory;