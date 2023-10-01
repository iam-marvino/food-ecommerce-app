import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    displayName : '' ,
    email : '' ,
    photoURL : '' ,
}


let userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        LOGIN:(state,action)=>{
            state.displayName = action.payload.displayName,
            state.email = action.payload.email,
            state.photoURL = action.payload.photoURL
        },
        LOGOUT:(state)=>{
            state.displayName = '',
            state.email = '',
            state.photoURL = ''
        }
    }
})

export let {LOGIN,LOGOUT} = userSlice.actions
export default userSlice.reducer