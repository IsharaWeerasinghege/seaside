import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {

        async function fetchPackages() {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/package/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                setPackages(res.data);
            }).catch(err => {
                console.log(err);
            })
        }

        fetchPackages();

    }, [])

    return (
        <div className={'w-full my-8 py-8 px-8 rounded '}>
            <h1 className={'mb-8 text-center font-bold text-3xl'}>Party Packages</h1>


                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center'}>
                    {packages.map((pack, index) => (
                        <div
                            key={index}
                            className={'bg-white shadow-lg rounded-lg py-8 px-4'}
                        >
                            <h1 className={'font-semibold text-xl mb-4 uppercase'} title={pack.description}>{pack.name}</h1>
                            <p className={'text-gray-800 font-semibold text-xl '}>$ {pack.price}</p>
                            <p className={'text-gray-500'}>Duration {pack.duration} day.</p>
                            <div
                                className={'mt-4 mb-2'}
                            >
                                {pack.features && pack.features.map((feature, index) => (
                                    <p key={index} className={'text-gray-500'}>• {feature} •</p>
                                ))}
                            </div>
                            <Link
                                to={`/package/${pack._id}`}
                                className={'bg-gray-900 text-white px-6 py-1.5 rounded-lg mt-4'}
                            >
                                Book Now
                            </Link>
                        </div>
                    ))}
                </div>

        </div>
    )
}

export default Packages;