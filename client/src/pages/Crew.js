import React, {useEffect, useState} from 'react';
import AddMember from "../forms/AddMember";
import CrewTable from "../tables/CrewTable";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setCrew} from "../store/crewSlice";
import {Pagination} from "@material-ui/lab";
import {Route, Routes} from "react-router-dom";
import UpdateMember from "../forms/UpdateMember";


const Crew = () => {
    const dispatch = useDispatch();
    const {crew} = useSelector(state => state.crew);


    useEffect(() => {
        getMembers();
    }, [handleDelete]);

    async function getMembers() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/crew/list`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });

            dispatch(setCrew(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDelete (id)  {
        if (window.confirm('Are you sure you want to delete this member?')) {
            if (id === localStorage.getItem('user')) {
                alert('You cannot delete yourself');
            } else {
                await axios.delete(`${process.env.REACT_APP_BASE_URL}/crew/delete/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                })
            }
        }
    }

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = crew.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">
            <Routes>
                <Route path={'/'} element={
                    <>
                        <CrewTable crew={currentItems} handleDelete={handleDelete}/>
                        <div className="flex justify-center mt-2">
                            <Pagination
                                count={Math.ceil(crew.length / itemsPerPage)}
                                page={currentPage}
                                onChange={(event, value) => setCurrentPage(value)}
                                size={'small'}/>
                        </div>
                    </>
                }/>
                <Route path={'/add'} element={<AddMember/>}/>
                <Route path={'/edit/:id'} element={<UpdateMember/>}/>
            </Routes>

        </div>
    )
}

export default Crew;