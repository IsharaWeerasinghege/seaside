import {createSlice} from "@reduxjs/toolkit";

const crewSlice = createSlice({
    name: "crew",
    initialState: {
        crew: [],
        loading: false,
    },
    reducers: {
        setCrew: (state, action) => {
            state.loading = true;
            state.crew = action.payload;
            state.loading = false;
        }
    }
})

export const {setCrew} = crewSlice.actions;
export const crewReducer = crewSlice.reducer;