import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setReservations} from "../store/reservationSlice";
import ReservationTable from "../tables/ReservationTable";
import {Pagination} from "@material-ui/lab";

const Reservation = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const {reservations} = useSelector(state => state.reservation);

    useEffect(() => {
        if(!isLoaded){
            getReservations();

            async function getReservations() {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/reservation/list`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    dispatch(setReservations(response.data));
                    setIsLoaded(true);
                } catch (error) {
                    console.log(error);
                }
            }
        }

    }, [isLoaded, handleUpdate])

    async function handleUpdate(id, type) {
        try {
            await axios.put(`http://localhost:3001/reservation/update/${id}`, {
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
    const paginatedReservations = reservations.slice(startIndex, endIndex);

    const paginate = (event, value) => {
        setPage(value);

    }

    return (
        <div className="relative shadow-lg sm:rounded-lg bg-white p-4">
            <div className={'overflow-x-auto'}>
                <ReservationTable tableData={paginatedReservations} handleUpdate={handleUpdate}/>
            </div>
            <div className={'mt-2 flex justify-center'}>
                <Pagination count={Math.ceil(reservations.length / itemsPerPage)} page={page} onChange={paginate}/>
            </div>
        </div>
    )
}

export default Reservation;