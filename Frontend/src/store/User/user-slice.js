import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        isAuthenticated:false,
        authChecked:false,
        loading:false,
        user:null,
        errors:null,
        success:false
    },
    reducers:{
        getSignupRequest(state){
            state.loading = true;
        },
        getSignupDetails(state,action){
            state.user = action.payload;
            state.isAuthenticated= true;
            state.authChecked = true;
            state.loading=false
        },
        getLoginRequest(state){
            state.loading = true
        },
        getLoginDetails(state,action){
            state.user = action.payload;
            state.isAuthenticated= true;
            state.authChecked = true;
            state.loading = false
        },
        getError(state,action){
            state.errors = action.payload;
            state.loading = false;
        },
        getCurrentUserRequest(state){
            state.loading = true;
        },
        getUpdateUserRequest(state){
            state.loading = true
        },
        getCurrentUser(state,action){
            state.user = action.payload;
            state.isAuthenticated = Boolean(action.payload);
            state.authChecked = true;
            state.loading = false;
        },
        getCurrentUserError(state, action) {
            state.user = null;
            state.isAuthenticated = false;
            state.authChecked = true;
            state.loading = false;
            state.errors = action.payload;
        },
        getLogoutRequest(state){
            state.loading = true;
        },
        getLogout(state,action){
            state.user = action.payload;
            state.isAuthenticated= false;
            state.authChecked = true;
            state.loading= false;
        },
        getPasswordRequest(state){
            state.loading = true;
        },
        getPasswordSuccess(state,action){
            state.success = action.payload;
            state.errors= null;
        },
        clearErrors(state){
            state.errors=null
        }
    }
})
export const userActions= userSlice.actions;
export default userSlice;