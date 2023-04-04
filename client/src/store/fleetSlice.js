import {createSlice} from "@reduxjs/toolkit";

const yachtSlice = createSlice({
    name: "yacht",
    initialState: {
        yacht: [],
        loading: false,
    },
    reducers: {
        setYacht: (state, action) => {
            state.loading = true;
            state.yacht = action.payload;
            state.loading = false;
        }
    }
})

export const {setYacht} = yachtSlice.actions;
export const yachtReducer = yachtSlice.reducer;