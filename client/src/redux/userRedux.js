import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null, 
        isFetching: false, 
        error: false
    },
    reducers: {
        loginRequest: (state) => {
            state.isFetching = true;
        }, 
        loginSuccess: (state, action) => {
            state.isFetching = false; 
            state.currentUser = action.payload;
        }, 
        loginFailure: (state) => {
            state.isFetching = false; 
            state.error = true; 
        }
    }
});

export const { loginRequest, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;