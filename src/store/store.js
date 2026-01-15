import { configureStore, createSlice } from "@reduxjs/toolkit";
import cart from "./cartSlice.js";

let user = createSlice({
    name : 'kps',
    initialState : 'kimsigi'
});

let stock = createSlice({
    name : 'stock',
    initialState : '[10, 11, 12]'
});

export default configureStore({
    reducer: {
        사람: user.reducer,
        재고: stock.reducer,
        장바구니: cart.reducer
    }
});