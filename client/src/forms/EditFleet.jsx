import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {Input, Textarea} from "../elements";
import {FaAddressCard, FaSave, FaUser, FaWarehouse} from "react-icons/fa";
import {SiMinutemailer} from "react-icons/si";
import {BsFillPhoneFill} from "react-icons/bs";
import {BiCategory} from "react-icons/bi";
import axios from "axios";
import Select from "../elements/Select";
import {useParams} from "react-router-dom";

const initialState = {
    fleetName: '', length: '', capacity: '', price: '', rooms: '', location: '', type: '', description: '',
};

const validationSchema = Yup.object({
    fleetName: Yup.string().required('Name is required'),
    length: Yup.string().required('Length is required'),
    capacity: Yup.string().required('Capacity is required'),
    price: Yup.string().required('Price is required'),
    rooms: Yup.string().required('Rooms is required'),
    location: Yup.string().required('Location is required'),
    type: Yup.string().required('Type is required'),
    description: Yup.string().required('Description is required'),
})

const EditFleet = () => {
    const {id} = useParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getFleet();
    }, [id])

    async function getFleet() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/yacht/${id}`);
            const {name, length, capacity, price, rooms, location, type, description} = response.data;

            initialState.fleetName = name;
            initialState.type = type;
            initialState.length = length;
            initialState.location = location;
            initialState.capacity = capacity;
            initialState.price = price;
            initialState.rooms = rooms;
            initialState.description = description;


        } catch (e) {
            console.log(e)
        }
    }

    const submitHandler = async (values) => {
        try {
            const {fleetName, length, capacity, price, rooms, location, type, description} = values;

            await axios.put(`${process.env.REACT_APP_BASE_URL}/yacht/update/${id}`, {
                fleetName, length, capacity, price, rooms, location, type, description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setSuccess('Yacht Updated successfully');
            setError('');
        } catch (e) {
            setError(e.message);
            setSuccess('');
        }
        clearState();
    };


    function clearState() {
        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 10000)
    }

    return (<>
        <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
        >
            {(formik) => (<Form onSubmit={formik.handleSubmit}>

                <div className={'w-full flex justify-between gap-4'}>
                    <Input
                        icon={<FaUser/>}
                        type="text"
                        name="fleetName"
                        placeholder="Name"
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>
                <div className={'w-full flex justify-between gap-4'}>
                    <Select
                        icon={<SiMinutemailer/>}
                        type="text"
                        name="type"
                        placeholder="Type"
                        list={[
                            {value: 'motor', label: 'Motor yachts'},
                            {value: 'sailing', label: 'Sailing yachts'},
                            {value: 'catamaran', label: 'Catamaran'},
                            {value: 'mega', label: 'Mega yachts'},
                            {value: 'expedition', label: 'Expedition yachts'},
                        ]}
                        onChange={(e) => formik.handleChange(e)}
                    />
                    <Input
                        icon={<BsFillPhoneFill/>}
                        type="tel"
                        name="length"
                        placeholder="Length"
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>
                <div className={'w-full flex justify-between gap-4'}>
                    <Input
                        icon={<FaAddressCard/>}
                        type="text"
                        name="price"
                        placeholder="Price"
                        onChange={(e) => formik.handleChange(e)}
                    />
                    <Input
                        icon={<FaAddressCard/>}
                        type="text"
                        name="rooms"
                        placeholder="Rooms"
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>
                <div className={'w-full flex justify-between gap-5'}>
                    <Select
                        icon={<FaWarehouse/>}
                        type="text"
                        name="location"
                        placeholder="Branch"
                        list={[{value: 'trincomalee', label: 'Trincomalee'}, {
                            value: 'galle', label: 'Galle'
                        }, {value: 'chilaw', label: 'Chilaw'}]}
                        onChange={(e) => formik.handleChange(e)}/>
                    <Input
                        icon={<BiCategory/>}
                        type="text"
                        name="capacity"
                        placeholder="Capacity"
                        onChange={(e) => formik.handleChange(e)}
                    />
                </div>
                <div className={'w-full flex justify-between gap-4'}>
                    <Textarea
                        icon={<FaWarehouse/>}
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={(e) => formik.handleChange(e)}>
                    </Textarea>
                </div>

                {success && <div className={'text-green-500 text-sm float-left'}>{success}</div>}
                {error && <div className={'text-red-500 text-sm float-left'}>{error}</div>}

                <button
                    type="submit"
                    className={'bg-gray-900 text-white py-2 px-6 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out float-right'}
                >
                    <FaSave className={'inline-block mr-2'}/>
                    Save Fleet
                </button>
            </Form>)}
        </Formik>
    </>);
};

export default EditFleet;