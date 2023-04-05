import React, {useEffect, useState} from 'react';
import {FaCalendarDay, FaUser, FaUsers} from "react-icons/fa";
import {Link, useParams} from "react-router-dom";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Input} from "../elements";
import {ImBook} from "react-icons/im";
import axios from "axios";

const initialValues = {
    checkIn: '',
    guests: '',
};

const Book = () => {
    const {id} = useParams()
    const [item, setItem] = useState('');
    const [user] = useState(localStorage.getItem('user'));
    const [booking, setBooking] = useState(initialValues);
    const {checkIn, guests} = booking;
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        async function getData() {
            await axios.get(`http://localhost:3001/yacht/${id}`)
                .then(res => {
                    setItem(res.data)
                }).catch(err => {
                    console.log(err.message)
                })
        }

        getData();
    }, [])


    const handleChange = (e) => {
        const {name, value} = e.target;
        setBooking({...booking, [name]: value})
    }

    const bookingValidation = Yup.object().shape({
        checkIn: Yup.date().required('Check in date is required'),
        guests: Yup.number().required('Guests is required'),
    });

    const submitHandler = async () => {
        try {
            const response = await axios.post('http://localhost:3001/reservation/create', {
                ...booking,
                yacht: id,
                user: user
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuccess(response.data.message);
            setErrors('');
        } catch (error) {
            setErrors(error.response.data.message);
            setSuccess('');
        }

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
                        <img src={`http://localhost:3001/assets/${item.image}`} alt={item.name}
                             className={'w-full h-72 rounded shadow-md mb-4'}/>
                        <div className={'bg-gray-100 rounded px-2 py-2 font-sans'}>
                            <h4>Name : {item.name}</h4>
                            <h4>Price : from {item.price} per day </h4>
                            <h4>Guest : {item.capacity}</h4>
                            <h4>Location : {item.location}</h4>
                        </div>
                    </div>

                    <div className={'w-full md:w-1/2 px-4'}>
                        {user ? (
                            <div className={'flex flex-col gap-4'}>
                                <h1 className={'text-center font-semibold text-2xl mb-8'}>Book Your Yacht</h1>
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        checkIn,
                                        guests,
                                    }
                                    }
                                    validationSchema={bookingValidation}
                                    onSubmit={(e) => {
                                        submitHandler()
                                    }
                                    }
                                >
                                    {(formik) => (
                                        <Form className={'text-center'}>
                                            <Input icon={<FaCalendarDay/>} type="date" name="checkIn"
                                                   placeholder="Check in date"
                                                   onChange={handleChange}/>
                                            <Input icon={<FaUsers/>} type="number" name="guests" placeholder="Guests"
                                                   onChange={handleChange}/>
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