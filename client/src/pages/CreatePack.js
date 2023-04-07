import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from "formik";
import {Input, Textarea} from "../elements";
import {FaListAlt, FaSave, FaStickyNote, FaUser} from "react-icons/fa";
import {AiFillDollarCircle} from "react-icons/ai";
import {TbNumbers} from "react-icons/tb";
import axios from "axios";

const initialValues = {name: '', price: '', description: '', duration: '', features: []}

const CreatePack = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const packageValidation = Yup.object().shape({
        name: Yup.string().required('Required'),
        price: Yup.number().required('Required'),
        description: Yup.string().required('Required'),
        duration: Yup.number().required('Required'),
        features: Yup.string()
            .required('Features are required')
            .matches(/^(\s*([a-zA-Z0-9]+\s*)+,?\s*)+$/, 'Features must be separated by commas')
    });

    const submitHandler = async (values) => {
        try {
           await axios.post(`${process.env.REACT_APP_BASE_URL}/package/create`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });


            setSuccess('Package created successfully');
            setError('');

            setTimeout(() => {
                window.location.reload();
            }, 1000);


        } catch (err) {
            setError(err.message);
            setSuccess('');

        }

        setTimeout(() => {
            setSuccess('');
            setError('');
        }, 10000);
    }

    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
            <h1 className={'font-semibold mb-4'}>Create Package</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={packageValidation}
                onSubmit={submitHandler}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label htmlFor="name"
                                   className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                            <Input icon={<FaUser/>} name={'name'} type={'text'} placeholder={'Enter name'}/>
                        </div>
                        <div>
                            <label htmlFor="price"
                                   className="block text-gray-700 text-sm font-semibold mb-2">Price</label>
                            <Input icon={<AiFillDollarCircle/>} name={'price'} type={'number'}
                                   placeholder={'Enter price'}/>
                        </div>
                        <div>
                            <label htmlFor="duration"
                                   className="block text-gray-700 text-sm font-semibold mb-2">Duration</label>
                            <Input icon={<TbNumbers/>} type={'number'} name="duration" placeholder={'Enter duration'}/>
                        </div>
                        <div>
                            <label htmlFor="features" className="block text-gray-700 text-sm font-bold mb-2">
                                Features
                                &nbsp;
                                <span className={'text-sm text-gray-500 font-semibold'}>(Add features by separate using  ", ")</span>
                            </label>
                            <Input icon={<FaListAlt/>} type={'text'} name="features" placeholder={'Enter features'}/>
                        </div>
                        <div>
                            <label htmlFor="description"
                                   className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
                            <Textarea icon={<FaStickyNote/>} type={'text'} name="description"
                                      placeholder={'Enter description'}/>
                        </div>
                        <div className={'flex justify-between'}>
                            <div>
                                {success && <p className={'text-green-500 text-sm font-semibold'}>{success}</p>}
                                {error && <p className={'text-red-500 text-sm font-semibold'}>{error}</p>}
                            </div>
                            <button
                                type="submit"
                                className={'bg-gray-900 text-white py-2 px-6 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out float-right'}
                            >
                                <FaSave className={'inline-block mr-2'}/>
                                Save Package
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default CreatePack;