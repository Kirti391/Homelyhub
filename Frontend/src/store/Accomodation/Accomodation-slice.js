import {createSlice} from "@reduxjs/toolkit";

const accomodationSlice = createSlice({
    name: "accomodation",
    initialState:{
        accomodation: [],
        loading:false,
        errors:null,
    },
    reducers:{
        getAccomodationRequest(state){
            state.loading = true;
            state.errors = null;
        },
        getAccomodation(state,action){
            state.accomodation= action.payload;
            state.loading= false;
            state.errors = null;
        },
        getAccomodationCreated(state) {
            state.loading = false;
            state.errors = null;
        },
        getErrors(state, action){
            state.errors = action.payload;
            state.loading= false
        },
        clearErrors(state) {
            state.errors = null;
        }
    }
})

export const accomodationActions = accomodationSlice.actions;
export default accomodationSlice;