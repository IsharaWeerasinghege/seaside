// noinspection DuplicatedCode

import React, {useState} from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {Input, Textarea} from "../elements";
import {FaAddressCard, FaImage, FaSave, FaUser, FaWarehouse} from "react-icons/fa";
import {SiMinutemailer} from "react-icons/si";
import {BsFillFuelPumpFill, BsFillPhoneFill} from "react-icons/bs";
import {BiCategory} from "react-icons/bi";
import axios from "axios";
import Select from "../elements/Select";
import {GiFuelTank} from "react-icons/gi";

const initialState = {
    fleetName: '', length: '', capacity: '', price: '', rooms: '', location: '', type: '', description: '', fuelType: '', fuelCapacity: ''
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
    fuelType: Yup.string().required('Fuel type is required'),
    fuelCapacity: Yup.number().required('Fuel capacity is required'),
})

const AddFleet = () => {
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('token');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const submitHandler = async (values) => {
        console.log(values)
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('fleetName', values.fleetName);
            formData.append('length', values.length);
            formData.append('capacity', values.capacity);
            formData.append('price', values.price);
            formData.append('rooms', values.rooms);
            formData.append('location', values.location);
            formData.append('type', values.type);
            formData.append('description', values.description);
            formData.append('fuelType', values.fuelType);
            formData.append('fuelCapacity', values.fuelCapacity);

            await axios.post(`${process.env.REACT_APP_BASE_URL}/yacht/create`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Yacht added successfully');
            setError('');
        } catch (e) {
            setError(e.message);
            setSuccess('');
        }
        clearState()
    };


    function clearState() {
        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 10000)
    }

    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
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
                    <Input
                        icon={<BiCategory/>}
                        type="text"
                        name="capacity"
                        placeholder="Capacity"
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
                    <Select
                        icon={<BsFillFuelPumpFill/>}
                        type="text"
                        name="fuelType"
                        placeholder="Feul Type"
                        list={[
                            {value: 'Diesel', label: 'Diesel'},
                            {value: 'Gasoline', label: 'Gasoline'},
                            {value: 'Electric', label: 'Electric'},
                            {value: 'Hybrid', label: 'Hybrid'},
                        ]}
                        onChange={(e) => formik.handleChange(e)}
                    />
                    <Input
                        icon={<GiFuelTank/>}
                        type="tel"
                        name="fuelCapacity"
                        placeholder="Fuel Capacity"
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
                    <Input
                        icon={<FaImage/>}
                        type="file"
                        name="image"
                        placeholder="Image"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <Select
                        icon={<FaWarehouse/>}
                        type="text"
                        name="location"
                        placeholder="Branch"
                        list={[{value: 'trincomalee', label: 'Trincomalee'}, {
                            value: 'galle', label: 'Galle'
                        }, {value: 'chilaw', label: 'Chilaw'}]}
                        onChange={(e) => formik.handleChange(e)}/>
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
        </div>
    );
};

export default AddFleet;