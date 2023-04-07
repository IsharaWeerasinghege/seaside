import React, {useEffect, useState} from 'react';
import {FaCalendarDay, FaUser, FaUsers, FaWarehouse} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Input} from "../elements";
import {ImBook} from "react-icons/im";
import axios from "axios";
import Select from "../elements/Select";

const initialValues = {
    date: '',
    guests: '',
    location: '',
};

const Book = () => {
    const {id} = useParams()
    const [item, setItem] = useState('');
    const [user] = useState(localStorage.getItem('user'));
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        async function getData() {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/package/${id}`)
                .then(res => {
                    setItem(res.data)
                }).catch(err => {
                    console.log(err.message)
                })
        }

        getData();
    }, [])


    const bookingValidation = Yup.object().shape({
        date: Yup.date().required('Check in date is required'),
        guests: Yup.number().required('Guests is required'),
        location: Yup.string().required('Location is required'),
    });

    const submitHandler = async (values) => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/booking/create`, {
            ...values,
            packageId: id,
            user: user
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setSuccess(res.data.message)
        }).catch(err => {
            setErrors(err.response.data.message)
        })

        setTimeout(() => {
            setSuccess('');
            setErrors('');
        }, 10000)
    }


    return (
        <div className={'w-full'}>
            <div className="container mx-auto bg-white my-8 rounded-md p-4 shadow-lg">
                <h1 className={'text-center font-bold text-3xl mb-8'}>Rent Your Yacht</h1>
                <div className={'flex flex-col md:flex-row gap-8'}>
                    <div className={'w-full md:w-1/2 px-4 border-r'}>
                        <img src="https://travelsaga.com/wp-content/uploads/2022/07/new-years-eve-yacht-party-dubai.jpg"
                             alt=""/>
                        <div className={'bg-gray-100 rounded px-2 py-2 font-sans'}>
                            <h4>Name : {item.name}</h4>
                            <h4>Price : $ {item.price} </h4>
                            <h4>Duration : {item.duration} Day</h4>
                            <h4 className={'flex gap-4'}>Features :
                                <ul>
                                    {item.features && item.features.map((feature) => (
                                        <li>{feature}</li>
                                    ))}
                                </ul>
                            </h4>
                            <h4>Description:
                                <p>
                                    {item.description}
                                </p>
                            </h4>
                        </div>
                    </div>

                    <div className={'w-full md:w-1/2 px-4'}>
                        {user ? (
                            <div className={'flex flex-col gap-4'}>
                                <h1 className={'text-center font-semibold text-2xl mb-8'}>Book Your Yacht</h1>
                                <Formik
                                    enableReinitialize
                                    initialValues={initialValues}
                                    validationSchema={bookingValidation}
                                    onSubmit={submitHandler}
                                >
                                    {(formik) => (
                                        <Form className={'text-center'}>
                                            <Input icon={<FaCalendarDay/>} type="date" name="date"
                                                   placeholder="Check in date"
                                            onChange={(e) => formik.handleChange(e)}
                                            />
                                            <Select icon={<FaWarehouse/>} type="text" name="location" placeholder="Location"
                                                    list={[{value: 'trincomalee', label: 'Trincomalee'}, {
                                                        value: 'galle', label: 'Galle'
                                                    }, {value: 'chilaw', label: 'Chilaw'}]}
                                                    onChange={(e) => formik.handleChange(e)}/>
                                            <Input icon={<FaUsers/>} type="number" name="guests" placeholder="Guests"
                                                   onChange={(e) => formik.handleChange(e)}
                                            />
                                            <button
                                                type={"submit"}
                                                name={'send'}
                                                className={'bg-gray-900 text-white py-2 px-4 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out'}
                                            >
                                                <ImBook className={'inline-block mr-2'}/>
                                                Book Now
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                                {success && (
                                    <div
                                        className={'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'}
                                        role="alert">
                                        <span className="block sm:inline">{success}</span>
                                    </div>
                                )}
                                {errors && (
                                    <div
                                        className={'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'}
                                        role="alert">
                                        <span className="block sm:inline">{errors}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={'flex flex-col justify-center items-center gap-4 h-full'}>
                                <FaUser className={'text-5xl text-gray-400'}/>
                                <p className={'text-center font-semibold mb-4'}> Please login to book your yacht </p>
                                <Link to={'/login'}
                                      className={'bg-gray-900 text-white py-1.5 px-8 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out'}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book;