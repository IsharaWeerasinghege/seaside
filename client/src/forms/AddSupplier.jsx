import React, {useState} from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {Input} from "../elements";
import {FaAddressCard, FaCity, FaSave, FaUser, FaWarehouse} from "react-icons/fa";
import {SiMinutemailer} from "react-icons/si";
import {BsFillPhoneFill} from "react-icons/bs";
import {BiCategory} from "react-icons/bi";
import {HiIdentification} from "react-icons/hi";
import {RiBankCard2Fill} from "react-icons/ri";
import Select from "../elements/Select";
import axios from "axios";

const initialState = {
    name: '', address: '', phone: '', email: '', category: '', location: '', nic: '', password: '', city: '',
}

const AddSupplier = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const supplierValidation = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        phone: Yup.string().required('Phone is required'),
        email: Yup.string().required('Email is required').email('Email is invalid'),
        category: Yup.string().required('Category is required'),
        location: Yup.string().required('Location is required'),
        nic: Yup.string().required('NIC is required'),
        city: Yup.string().required('City is required'),
        password: Yup.string().required('Password is required')
    });


    const submitHandler = async (values) => {
        try {
            const {name, address, phone, email, category, location, nic, password, city} = values;
            await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
                name,
                address,
                phone,
                email,
                category,
                location,
                nic,
                password,
                city,
                role: 'supplier'
            });

            setSuccess("Supplier added successfully");
            setError('');

            setTimeout(() => {
                setSuccess('');
            }, 10000)


        } catch (e) {
            setError(e.message);
            setSuccess('');

            setTimeout(() => {
                setError('');
            }, 10000)
        }
    }
    return (<>
        <Formik
            initialValues={initialState}
            validationSchema={supplierValidation}
            onSubmit={submitHandler}
        >
            {(formik) => (
                <Form>
                    <div className={'w-full flex justify-between gap-4'}>
                        <Input
                            icon={<FaUser/>}
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            onChange={(e) => formik.handleChange(e)}/>

                        <Select
                            icon={<BiCategory/>}
                            type="text"
                            name="category"
                            placeholder="Category"
                            list={[{value: 'food', label: 'Food'}, {
                                value: 'fuel',
                                label: 'Fuel'
                            }, {value: 'electronics', label: 'Electronics'}]}
                            onChange={(e) => formik.handleChange(e)}/>
                    </div>
                    <div className={'w-full flex justify-between gap-4'}>
                        <Input icon={<SiMinutemailer/>} type="text" name="email" placeholder="Email"
                               onChange={(e) => formik.handleChange(e)}/>
                        <Input icon={<BsFillPhoneFill/>} type="tel" name="phone" placeholder="Phone"
                               onChange={(e) => formik.handleChange(e)}/>
                    </div>
                    <div className={'w-full flex justify-between gap-4'}>
                        <Input icon={<FaAddressCard/>} type="text" name="address" placeholder="Address"
                               onChange={(e) => formik.handleChange(e)}/>
                    </div>
                    <div className={'w-full flex justify-between gap-4'}>
                        <Input icon={<FaCity/>} type="text" name="city" placeholder="City"
                               onChange={(e) => formik.handleChange(e)}/>
                        <Select icon={<FaWarehouse/>} type="text" name="location" placeholder="Warehouse Location"
                                list={[{value: 'trincomalee', label: 'Trincomalee'}, {
                                    value: 'galle', label: 'Galle'
                                }, {value: 'chilaw', label: 'Chilaw'}]}
                                onChange={(e) => formik.handleChange(e)}/>
                    </div>
                    <div className={'w-full flex justify-between gap-4'}>

                        <Input icon={<HiIdentification/>} type="text" name="nic" placeholder="NIC"
                               onChange={(e) => formik.handleChange(e)}/>
                        <Input icon={<RiBankCard2Fill/>} type="password" name="password" placeholder="Password"
                               onChange={(e) => formik.handleChange(e)}/>
                    </div>

                    <div className={'w-full flex justify-between gap-4'}>
                        <div>
                            {success && <div className={'text-green-500 text-sm float-left'}>{success}</div>}
                            {error && <div className={'text-red-500 text-sm float-left'}>{error}</div>}
                        </div>
                        <button
                            type={"submit"}
                            name={'send'}
                            className={'bg-gray-900 text-white my-2 py-2 px-6 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out'}
                        >
                            <FaSave className={'inline-block mr-2'}/>
                            Save
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    </>)
}

export default AddSupplier;