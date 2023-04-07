import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Pagination} from "@material-ui/lab";
import InventoryTable from "../tables/inventoryTable";




const Inventory = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getYachts();
    }, []);



    async function getYachts() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/inventory/list`,
                {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white p-4">

            <div>

                    <h1 className="text-2xl font-semibold mb-2">Inventory Status</h1>
                    <div>
                        <InventoryTable yachts={currentItems}/>
                    </div>
                    <div className="flex justify-center mt-2">
                        <Pagination shape={'rounded'} size={'small'}
                                    count={Math.ceil(data.length / itemsPerPage)}
                                    page={currentPage} onChange={paginate}/>
                    </div>

            </div>
        </div>
    )
}

export default Inventory;