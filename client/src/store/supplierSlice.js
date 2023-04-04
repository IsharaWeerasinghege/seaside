import {createSlice} from "@reduxjs/toolkit";

const supplierSlice = createSlice({
    name: "supplier",
    initialState: {
        suppliers: [],
        loading: false,
    },
    reducers: {
        setSuppliers: (state, action) => {
            state.suppliers = action.payload;
        }
    }
});

export const {setSuppliers} = supplierSlice.actions;

export const supplierReducer = supplierSlice.reducer;