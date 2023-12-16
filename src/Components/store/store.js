import { configureStore } from "@reduxjs/toolkit";
import HiddenSlice from "./HiddenSlice";
import ItemsSlice from "./ItemsSlice";

const store=configureStore({
    reducer:{
        hiddenstate:HiddenSlice,
        Items:ItemsSlice
    }
})

export default store;