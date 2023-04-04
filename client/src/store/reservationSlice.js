import {createSlice} from "@reduxjs/toolkit";

const reservationSlice = createSlice({
    name: "reservation",
    initialState: {
        reservations: [],
    },
    reducers: {
        setReservations: (state, action) => {
            state.reservations = action.payload;
        },
        filterReservations: (state, action) => {
            state.reservations = state.reservations.filter(reservation => reservation.type !== action.payload)
        }
    }
});

export const {setReservations, filterReservations} = reservationSlice.actions;

export const reservationReducer = reservationSlice.reducer;