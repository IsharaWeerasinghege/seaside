import React from 'react';
import {GiSailboat} from "react-icons/gi";
import {Link} from "react-router-dom";

const HeroBanner = () => {
    return (
        <div className={'hero-banner'}>
            <div className={'w-full h-[500px] hero-overlay flex items-center justify-center'}>
                <div className={'text-center'}>
                    <GiSailboat className={'text-6xl mx-auto'}/>
                    <h1 className={'text-6xl font-serif font-bold text-gray-900'}>SeaSide</h1>
                    <h2 className={'capitalize font-semibold font-sans mb-6'}>Yacht Rental Service</h2>
                    <Link to={'/yachts'} className={'bg-neutral-600 rounded px-4 py-2 text-gray-300 font-serif'}>
                        Yacht Showcase
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner;