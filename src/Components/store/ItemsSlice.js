
import { createSlice } from "@reduxjs/toolkit";


const ItemsSlice=createSlice({
    name:"Items",
    initialState:{
        items : [
            { id: 1,date: '20-12-2023',message:"Lorem ipsum dolor sit amet consectetur, adipisicing",status:"Success"},
            { id: 2,date: '21-12-2023',message:"Lorem ipsum dolor sit amet consectetur, adipisicing",status:"Failed" },
            { id: 3,date: '24-12-2023',message:"Lorem ipsum dolor sit amet consectetur, adipisicing",status:"Success" },
            { id: 4,date: '21-11-2023',message:"Lorem ipsum dolor sit amet consectetur, adipisicing",status:"Failed" },
            { id: 5,date: '08-10-2023',message:"Lorem ipsum dolor sit amet consectetur, adipisicing",status:"Success" },
          ]
          
    },

    reducers:{
    deleteItems:(state,action)=>{
            state.items=state.items.filter((item)=>{
                return item.id!==action.payload;
            })
        }
    }
})

export const { deleteItems } =ItemsSlice.actions
export default ItemsSlice.reducer