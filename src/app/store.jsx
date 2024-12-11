import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";
import productReducer from "./features/product/productSlice";


const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        storeInfo: productReducer,
    }
})

export default store;