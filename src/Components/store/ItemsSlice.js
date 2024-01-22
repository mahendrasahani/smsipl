
import { createSlice } from "@reduxjs/toolkit";


const ItemsSlice=createSlice({
    name:"Items",
    initialState:{
        items : []
          
    },

    reducers:{

     addItems:(state,action)=>{
        state.items=action.payload;
     },
        
    deleteItems:(state,action)=>{
            state.items=state.items.filter((item)=>{
                return item.id!==action.payload;
            })
        }
    }
})

export const { deleteItems,addItems } =ItemsSlice.actions
export default ItemsSlice.reducer