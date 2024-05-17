import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./reducers/postSlice";
export const store=configureStore({
    reducer:{
        Posts:postSlice.reducer,
    }
})