/**
 * Created by: ishara weerasinghe
 * Date: 2023/04/03
 * Project: YachtRent
 * File: Home
 * features:
 * 1. This is the main page of the application
 * 2. This page contains the header and footer
 * 3. This page contains the main content
 * 4. This page contains the routes for the application
 */

import React from 'react';
import {Footer, Header} from "../components";
import Main from "./Main";
import {Route, Routes} from "react-router-dom";
import Yachts from "./Yachts";
import Book from "./Book";
import Login from "./Login";
import Profile from "./Profile";

const Home = () => {
    return (
        <div className={'bg-teal-50'}>
            <Header/>
            <div>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/yachts'} element={<Yachts/>}/>
                    <Route path={'/rent/:id'} element={<Book/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;