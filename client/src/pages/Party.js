import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReservationTable from "../tables/ReservationTable";
import {Pagination} from "@material-ui/lab";

const Party = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if(!isLoaded){
            getReservations();

            async function getReservations() {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/booking/list`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setData(response.data);
                    setIsLoaded(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }

    }, [isLoaded, handleUpdate])

    async function handleUpdate(id, type) {
        try {
            await axios.put(`${process.env.REACT_APP_BASE_URL}/booking/update/${id}`, {
                status: type
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIsLoaded(false)
        } catch (error) {
            console.log(error);
        }
    }

    // pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const paginatedReservations = data.slice(startIndex, endIndex);

    const paginate = (event, value) => {
        setPage(value);

    }

    return (
        <div className="relative shadow-lg sm:rounded-lg bg-white p-4">
            <div className={'overflow-x-auto'}>
                <ReservationTable tableData={paginatedReservations} pack handleUpdate={handleUpdate}/>
            </div>
            <div className={'mt-2 flex justify-center'}>
                <Pagination count={Math.ceil(data.length / itemsPerPage)} page={page} onChange={paginate}/>
            </div>
        </div>
    )
}

export default Party;