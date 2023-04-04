/**
 * @file Main.js
 * @description This file contains the main page of the application
 * @date 2021-04-03
 * @version 1.0.0
 * @author Ishara
 *
 * features:
 */

import React from 'react';
import {About, Contact, HeroBanner, Packages, Stats} from "../components";

const Main = () => {
  return (
    <>
        <HeroBanner/>
        <div className="container px-10 mx-auto h-full">
            <Stats/>
            <Packages />
            <About />
            <Contact />
        </div>
    </>
  )
}

export default Main;