
import React from 'react';
import {About, Contact, HeroBanner, Packages, Stats} from "../components";

const Main = () => {
    return (
        <>
            <HeroBanner/>
            <div className="container px-10 mx-auto h-full">
                <Stats/>
                <Packages/>
                <About/>
                <Contact/>
            </div>
        </>
    )
}

export default Main;