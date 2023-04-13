import React, {useEffect, useState} from 'react';
import AddFleet from "../forms/AddFleet";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setYacht} from "../store/fleetSlice";
import YachtTable from "../tables/yachtTable";
import {Pagination} from '@material-ui/lab';
import {Route, Routes} from "react-router-dom";
import EditFleet from "../forms/EditFleet";


const Fleet = () => {
    const [tab, setTab] = useState('table');
    const dispatch = useDispatch();
    const {yacht} = useSelector(state => state.yacht);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = yacht.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    useEffect(() => {
        getYachts();
    }, [tab, deleteYacht]);

    async function getYachts() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/yacht/list`);

            dispatch(setYacht(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteYacht(id) {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/yacht/delete/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
                <Routes>
                    <Route path={'/'} element={
                        <>
                            <div>
                                <YachtTable deleteYacht={deleteYacht} yachts={currentItems}/>
                            </div>
                            <div className="flex justify-center mt-2">
                                <Pagination shape={'rounded'} size={'small'}
                                            count={Math.ceil(yacht.length / itemsPerPage)}
                                            page={currentPage} onChange={paginate}/>
                            </div>
                        </>
                    }/>

                    <Route path={'/add'} element={<AddFleet/>}/>
                    <Route path={'/edit/:id'} element={<EditFleet/>}/>
                </Routes>

            </div>


        </div>
    )
}

export default Fleet;