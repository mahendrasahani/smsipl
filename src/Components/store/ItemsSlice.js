
import { createSlice } from "@reduxjs/toolkit";


const ItemsSlice=createSlice({
    name:"Items",
    initialState:{
        items : [],
        idCount:0,
          
    },

    reducers:{

     addItems:(state,action)=>{
        state.items=action.payload;
     },

     incrementIdcount:(state,action)=>{
          state.idCount+=1;
     },
        
    deleteItems:(state,action)=>{
            state.items=state.items.filter((item)=>{
                return item.id!==action.payload;
            })
        }
    }
})

export const { deleteItems,addItems,incrementIdcount } =ItemsSlice.actions
export default ItemsSlice.reducer