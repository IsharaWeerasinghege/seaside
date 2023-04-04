import React, {useState} from 'react';
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Input} from "../elements";
import {FaKey, FaMapMarkerAlt, FaPhone} from "react-icons/fa";
import {SiMinutemailer} from "react-icons/si";
import {IoMdLogIn} from "react-icons/io";
import {IoKeyOutline} from "react-icons/io5";
import {RiUserLine} from "react-icons/ri";
import axios from "axios";
import CustomLoader from "../elements/CustomLoader";
import {useNavigate} from "react-router-dom";


const initialValues = {
    login_email: '',
    login_password: '',
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    address: '',
}

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialValues);
    const {login_email, login_password, name, email, password, confirm_password, phone, address} = formData;
    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState('');
    const [signInError, setSignInError] = useState('');
    const [signInSuccess, setSignInSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const loginValidation = Yup.object({
        login_email: Yup.string().email('Please enter valid email address.').required('Email Address is required.'),
        login_password: Yup.string().required('Please enter a password.'),
    })

    const RegisterValidation = Yup.object({
        name: Yup.string().required('Please enter your name.').min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters").matches(/^[aA-zZ\s]+$/, "Name must be only letters"),
        email: Yup.string().email('Please enter valid email address.').required('Email Address is required.'),
        password: Yup.string().required('Please enter a password.').min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
        confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please Re-Type password.'),
        phone: Yup.string().required('Please enter your phone number.'),
        address: Yup.string().required('Please enter your address.').min(10, "Address must be at least 10 characters").max(100, "Address must be less than 100 characters"),
    })

    const signInHandler = async () => {
        setLoading(true)
        try {
            const {login_email, login_password} = formData;
            const {data} = await axios.post('http://localhost:3001/signin', {email:login_email, password:login_password});

            if (data.user){
                const {token, name, role, id} = data.user;
                localStorage.setItem('user', id);
                localStorage.setItem('token', token);
                localStorage.setItem('name', name);
                localStorage.setItem('role', role);

                setTimeout(() => {
                    window.location.href = '/';
                }, 2000)


            }

            setSignInError('');
            setLoading(false)
        } catch (error) {
            setSignInError(error?.response?.data?.message);
            setSignInSuccess('');
            setLoading(false)
        }
    }

    const signUpHandler = async () => {
        setLoading(true)
        try {
            const {name, address, email, password, phone} = formData;
            const {data} = await axios.post('http://localhost:3001/signup', {name, address, email, password, phone});

            setSignUpSuccess(data.message);
            setSignUpError('');
            setLoading(false)

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000)


        } catch (error) {
            setSignUpError(error?.response?.data?.message);
            setSignUpSuccess('');
            setLoading(false)
        }
    }


    return (
        <div className={'w-full my-8'}>
            <div className="container mx-auto bg-white rounded-md p-8 shadow-lg flex relative">
                {loading && <CustomLoader />}
                <div className={'flex flex-col gap-4 w-1/2 px-8 py-4 border-r'}>
                    <h1 className={'text-center font-semibold text-2xl mb-4'}>Login</h1>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            login_email,
                            login_password
                        }}
                        validationSchema={loginValidation}
                        onSubmit={() => {
                            signInHandler();
                        }}
                    >
                        {(form) => (
                            <Form>

                                <Input icon={<SiMinutemailer/>} type="text" name="login_email"
                                       placeholder="Email" onChange={handleChange}/>
                                <Input icon={<FaKey/>} type="password" name="login_password"
                                       placeholder="Password" onChange={handleChange}/>
                                <button
                                    type={"submit"}
                                    name={'send'}
                                    className={'bg-gray-900 text-white py-2 px-4 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out'}
                                >
                                    <IoMdLogIn className={'inline-block mr-2'}/>
                                    Login
                                </button>

                            </Form>
                        )}
                    </Formik>
                    {signInError && <div className={'text-red-500 text-center'}>{signInError}</div>}
                    {signInSuccess && <div className={'text-green-500 text-center'}>{signInSuccess}</div>}
                </div>

                <div className={'flex flex-col gap-4 w-1/2 px-8 py-4 '}>
                    <h1 className={'text-center font-semibold text-2xl mb-4'}>Register</h1>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name,
                            email,
                            password,
                            confirm_password,
                            phone,
                            address
                        }}
                        validationSchema={RegisterValidation}
                        onSubmit={() => {
                            signUpHandler()
                        }}
                    >
                        {(form) => (
                            <Form>
                                <Input icon={<RiUserLine/>} type="text" name="name" placeholder="Name"
                                       onChange={handleChange}/>
                                <Input icon={<SiMinutemailer/>} type="email" name="email" placeholder="Email"
                                       onChange={handleChange}/>
                                <Input icon={<IoKeyOutline/>} type="password" name="password"
                                       placeholder="Password" onChange={handleChange}/>
                                <Input icon={<IoKeyOutline/>} type="password" name="confirm_password"
                                       placeholder="Re-Type Password" onChange={handleChange}/>
                                <Input icon={<FaPhone/>} type="tel" name="phone" placeholder="Phone"
                                       onChange={handleChange}/>
                                <Input icon={<FaMapMarkerAlt/>} type="text" name="address" placeholder="Address"
                                       onChange={handleChange}/>
                                <button
                                    disabled={loading}
                                    type={"submit"}
                                    name={'signUp'}
                                    className={'bg-gray-900 text-white py-2 px-4 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out'}
                                >
                                    <IoMdLogIn className={'inline-block mr-2'}/>
                                    Register
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {signUpError && <p className={'text-red-500 text-center'}>{signUpError}</p>}
                    {signUpSuccess && <p className={'text-green-500 text-center'}>{signUpSuccess}</p>}
                </div>

            </div>
        </div>
    )
}

export default Login;