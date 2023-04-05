import React, {useState} from 'react';
import {Input, Textarea} from "../elements";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {SiMinutemailer} from "react-icons/si";
import {FaUser} from "react-icons/fa";
import {BsFillPhoneFill} from "react-icons/bs";
import axios from "axios";

const initialValues = {
    name: '',
    email: '',
    message: '',
    phone: ''
}

const Feedback = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const contactValidation = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        message: Yup.string().required('Message is required'),
        phone: Yup.string().matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Invalid phone number format').required('Phone number is required')
    })


    const submitHandler = async (values) => {
        setBtnDisabled(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/feedback/create`, values);
            setSuccess(response.data.message);
            setError(null);
        } catch (error) {
            setError(error.response.data.message)
            setSuccess(null);
            setBtnDisabled(false)
        }

        setTimeout(() => {
            setSuccess(null);
            setBtnDisabled(false);
            setError(null)
        }, 10000)
    }

    return (
        <div id={'Feedback'} className={'py-12 px-10 text-center shadow-lg rounded-lg mb-8 bg-white'}>
            <h1 className={'text-3xl font-bold mb-6'}>Feedback</h1>
            <div className={'max-w-[600px] mx-auto'}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={contactValidation}
                    onSubmit={submitHandler}
                >
                    {(formik) => (
                        <Form>
                            <Input icon={<FaUser/>} type="text" name="name" placeholder="Your Name"
                                   onChange={(e) => formik.handleChange(e)}/>
                            <Input icon={<SiMinutemailer/>} type="text" name="email" placeholder="Your Email"
                                   onChange={(e) => formik.handleChange(e)}/>
                            <Input icon={<BsFillPhoneFill/>} type="tel" name="phone" placeholder="Your Phone"
                                   onChange={(e) => formik.handleChange(e)}/>
                            <Textarea name="message" placeholder="Your Message"
                                      onChange={(e) => formik.handleChange(e)}/>
                            <div className={'my-2'}>
                                {error && <p className={'text-red-500 text-sm text-left'}>{error}</p>}
                                {success && <p className={'text-green-500 text-sm text-left'}>{success}</p>}
                            </div>
                            <button
                                type={"submit"}
                                disabled={btnDisabled}
                                name={'send'}
                                className={'bg-gray-900 text-white py-1.5 px-4 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out'}
                            >
                                <SiMinutemailer className={'inline-block mr-2'}/>
                                Send Feedback
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}

export default Feedback;