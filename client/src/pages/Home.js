import React from 'react';
import {Footer, Header} from "../components";
import Main from "./Main";
import {Route, Routes} from "react-router-dom";
import Yachts from "./Yachts";
import Book from "./Book";
import Login from "./Login";
import Profile from "./Profile";
import BookPack from "./BookPack";

const Home = () => {
    return (
        <div className={'bg-teal-50'}>
            <Header/>
            <div>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/yachts'} element={<Yachts/>}/>
                    <Route path={'/rent/:id'} element={<Book/>}/>
                    <Route path={'/package/:id'} element={<BookPack/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;