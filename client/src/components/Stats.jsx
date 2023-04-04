/**
 * @file Stats.jsx
 * @description This file contains the code for the Stats component.
 */

import React from 'react';
import {AiFillHome} from "react-icons/ai";
import {IoMdBoat} from "react-icons/io";
import {FaUsers} from 'react-icons/fa';
import {RiSailboatFill} from "react-icons/ri";

const Stats = () => {
    return (
        <div className={'h-44 flex items-center justify-around'}>

            <div className={'w-1/5 bg-neutral-900 rounded-lg flex flex-row items-center py-2.5 px-5 gap-4'}>
                <div className={'w-9 h-9 bg-white rounded-full grid place-items-center'}>
                    <AiFillHome className={'text-xl'}/>
                </div>
                <div>
                    <h1 className={'text-neutral-50 capitalize text-sm'}>Branches</h1>
                    <h5 className={'text-neutral-50 text-lg font-bold'}>3+</h5>
                </div>
            </div>

            <div className={'w-1/5 bg-neutral-900 rounded-lg flex flex-row items-center py-2.5 px-5 gap-4'}>
                <div className={'w-9 h-9 bg-white rounded-full grid place-items-center'}>
                    <IoMdBoat className={'text-xl'} />
                </div>
                <div>
                    <h1 className={'text-neutral-50 capitalize text-sm'}>Yacht Rented</h1>
                    <h5 className={'text-neutral-50 text-lg font-bold'}>199+</h5>
                </div>
            </div>

            <div className={'w-1/5 bg-neutral-900 rounded-lg flex flex-row items-center py-2.5 px-5 gap-4'}>
                <div className={'w-9 h-9 bg-white rounded-full grid place-items-center'}>
                    <FaUsers className={'text-xl'} />
                </div>
                <div>
                    <h1 className={'text-neutral-50 capitalize text-sm'}>Happy Clients</h1>
                    <h5 className={'text-neutral-50 text-lg font-bold'}>150+</h5>
                </div>
            </div>

            <div className={'w-1/5 bg-neutral-900 rounded-lg flex flex-row items-center py-2.5 px-5 gap-4'}>
                <div className={'w-9 h-9 bg-white rounded-full grid place-items-center'}>
                    <RiSailboatFill className={'text-xl'} />
                </div>
                <div>
                    <h1 className={'text-neutral-50 capitalize text-sm'}>Available Yachts</h1>
                    <h5 className={'text-neutral-50 text-lg font-bold'}>37+</h5>
                </div>
            </div>

        </div>
    )
}

export default Stats;