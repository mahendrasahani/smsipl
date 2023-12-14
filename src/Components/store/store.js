import { configureStore } from "@reduxjs/toolkit";
import HiddenSlice from "./HiddenSlice";

const store=configureStore({
    reducer:{
        hiddenstate:HiddenSlice
    }
})

export default store;