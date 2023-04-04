import React, {useState} from 'react';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {Input} from "../elements";
import {FaAddressCard, FaCity, FaSave, FaUser, FaWarehouse} from "react-icons/fa";
import {BiCategory} from "react-icons/bi";
import {SiMinutemailer} from "react-icons/si";
import {BsFillPhoneFill} from "react-icons/bs";
import {HiIdentification} from "react-icons/hi";
import {RiBankCard2Fill} from "react-icons/ri";
import axios from "axios";
import Select from "../elements/Select";
import {useParams} from "react-router-dom";

const initialState = {
    name: '', address: '', phone: '', email: '', role: '', location: '', nic: '', password: '', city: '',
}

const AddMember = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    const memberValidation = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        phone: Yup.string().required('Phone is required'),
        email: Yup.string().required('Email is required'),
        role: Yup.string().required('Role is required'),
        location: Yup.string().required('Location is required'),
        nic: Yup.string().required('NIC is required'),
        password: Yup.string().required('Password is required'),
        city: Yup.string().required('City is required')
    });


    const submitHandler = async (values) => {
        try {
            const {name, address, phone, email, role, location, nic, password, city} = values;
            await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
                name,
                address,
                email,
                password,
                phone,
                role,
                branch: location,
                nic,
                city
            });

            setSuccess("Member added successfully");
            setError('');


        } catch (e) {
            setError("Member adding failed");
            setSuccess('');

            setTimeout(() => {
                setError('');
            }, 10000)

        }
    }
    return (<>
        <Formik
            initialValues={initialState}
            validationSchema={memberValidation}
            onSubmit={submitHandler}
        >
            {(formik) => (
                <Form>
                    <div className={'w-full flex justify-between gap-4'}>
                        <Input
                            icon={<FaUser/>}
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={(e) => formik.handleChange(e)}/>

                        <Select
                            icon={<BiCategory/>}
                            type="text"
                            name="role"
                            list={[
                                {value: 'admin_rhm', label: 'Reservation Manager'},
                                {value: 'admin_fleet', label: 'Fleet Manager'},
                                {value: 'admin_party', label: 'Party Manager'},
                                {value: 'admin_feed', label: 'Feedback Manager'},
                                {value: 'staff', label: 'Staff'},
                                {value: 'admin_crew', label: 'Crew Manager'},
                                {value: 'admin_shm', label: 'Supplier Manager'}
                            ]}
                            placeholder="Role"
                            onChange={(e) => formik.handleChange(e)}/>
                    </div>
                    <div className={'w-full flex justify-between gap-4'}>
                        <Input
                            icon={<SiMinutemailer/>}
                            type="text" name="email"
                            placeholder="Email"
                            onChange={(e) => formik.handleChange(e)}/>

                        <Input
                            icon={<BsFillPhoneFill/>}
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            onChange={(e) => formik.handleChange(e)}/>
                    </div>
                    <div className={'w-full flex justify-between gap-4'}>
                        <Input
                            icon={<FaAddressCard/>}
                            type="text"
                            name="address"
                            placeholder="Address"
                            onChange={(e) => formik.handleChange(e)}/>
                    </div>
                    <div className={'w-full flex justify-between gap-4'}>
                        <Input
                            icon={<FaCity/>}
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={(e) => formik.handleChange(e)}/>
                        <Select
                            icon={<FaWarehouse/>}
                            type="text"
                            name="location"
                            placeholder="Branch"
                            list={[{value: 'trincomalee', label: 'Trincomalee'}, {
                                value: 'galle',
                                label: 'Galle'
                            }, {value: 'chilaw', label: 'Chilaw'}]}
                            onChange={(e) => formik.handleChange(e)}/>
                    </div>
                    <div className={'w-full flex justify-between gap-4'}>

                        <Input
                            icon={<HiIdentification/>}
                            type="text"
                            name="nic"
                            placeholder="NIC"
                            onChange={(e) => formik.handleChange(e)}/>
                        <Input
                            icon={<RiBankCard2Fill/>}
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => formik.handleChange(e)}/>
                    </div>

                    {success && <div className={'text-green-500 text-sm float-left'}>{success}</div>}
                    {error && <div className={'text-red-500 text-sm float-left'}>{error}</div>}

                    <button
                        type={"submit"}
                        name={'send'}
                        className={'bg-gray-900 text-white py-2 px-6 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out float-right'}
                    >
                        <FaSave className={'inline-block mr-2'}/>
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    </>)
}

export default AddMember