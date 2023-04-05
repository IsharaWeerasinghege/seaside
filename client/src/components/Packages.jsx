/**
 * @file Packages.jsx
 * @description Packages component
 * This component is used to display the available packages
 */

import React from 'react';
import {Link} from "react-router-dom";
import {packages} from "../data/data";

const Packages = () => {
    return (
        <div className={'w-full my-8 py-8 px-8 rounded '}>
            <h1 className={'mb-8 text-center font-bold text-3xl'}>Party Packages</h1>
            <div className={'flex justify-around'}>

                {packages.map((item, index) => (
                    <div key={index} className={'w-1/4 shadow-lg rounded-lg px-4 py-8 bg-white text-center'}>
                        <h2 className={'text-lg font-bold mb-4 uppercase'}>{item.name}</h2>
                        <ul className={'mb-5'}>
                            <li className={'mb-1 text-neutral-600'}>{item.people} People</li>
                            <li className={'mb-1 text-neutral-600'}>{item.duration}</li>
                            <li className={'mb-1 text-neutral-600 text-xl font-semibold'}>{item.price}</li>
                        </ul>
                        <Link
                            to={{pathname: '/rent/', search: `?id=pack_id&type='pack'`}}
                            className={'bg-gray-900 text-white py-1.5 px-8 rounded shadow-md hover:text-blue-500 transition duration-300 ease-in-out'}>
                            Book Now
                        </Link>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Packages;