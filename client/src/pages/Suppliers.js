import React, {useEffect, useState} from 'react';
import AddSupplier from "../forms/AddSupplier";
import SupplierTable from "../tables/SupplierTable";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setSuppliers} from "../store/supplierSlice";
import {Route, Routes} from "react-router-dom";
import {Pagination} from "@material-ui/lab";


const Suppliers = () => {
    const dispatch = useDispatch();
    const {suppliers} = useSelector(state => state.supplier);

    useEffect(() => {
        getSupplier();
    }, [deleteSupplier])

    async function getSupplier() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/supplier/list`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });

            dispatch(setSuppliers(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteSupplier(id) {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/supplier/delete/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    // Get current posts
    const indexOfLastItem = currentPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;
    const currentItems = suppliers.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="relative shadow-lg sm:rounded-lg bg-white p-4 h-full ">
            <Routes>
                <Route path={'/'} element={
                    <div>
                        <>
                            <div className={'overflow-x-auto'}>
                                <SupplierTable deleteSupplier={deleteSupplier} supplier={currentItems}/>
                            </div>
                            <div
                                className="flex flex-col items-center justify-center bg-white px-4 pt-2 border-t border-gray-200 sm:px-6"
                            >
                                <Pagination size={'small'} count={Math.ceil(suppliers.length / postsPerPage)}
                                            page={currentPage} onChange={(e, value) => paginate(value)}/>
                            </div>
                        </>

                    </div>
                }/>

                <Route path={'/add'} element={<AddSupplier/>}/>

            </Routes>


        </div>
    )
}

export default Suppliers;