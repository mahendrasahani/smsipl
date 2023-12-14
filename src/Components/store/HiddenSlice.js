import { createSlice } from "@reduxjs/toolkit";


const HiddenSlice=createSlice({
    name:"hiddenstate",
    initialState:{
        hidden:false
    },

    reducers:{
        setHidden:(state,action)=>{
            state.hidden=!state.hidden;
        }
    }
})

export const { setHidden } = HiddenSlice.actions
export default HiddenSlice.reducer