import { createSlice } from "@reduxjs/toolkit";


const HiddenSlice=createSlice({
    name:"hiddenstate",
    initialState:{
        hidden:false,
        userDetails:{
            username: "",
            password: "",
          }
    },

    reducers:{
        setHidden:(state,action)=>{
            state.hidden=action.payload;
        },
        
        setUserDetails:(state,action)=>{
                   state.userDetails=action.payload;
        }
    }
})

export const { setHidden,setUserDetails} = HiddenSlice.actions
export default HiddenSlice.reducer