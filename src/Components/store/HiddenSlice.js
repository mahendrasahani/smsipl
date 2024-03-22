import { createSlice } from "@reduxjs/toolkit";


const HiddenSlice=createSlice({
    name:"hiddenstate",
    initialState:{
        hidden:false,
    },

    reducers:{
        setHidden:(state,action)=>{
            state.hidden=action.payload;
        },
        
     
    }
})

export const { setHidden} = HiddenSlice.actions
export default HiddenSlice.reducer