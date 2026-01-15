import { createSlice } from "@reduxjs/toolkit";

// 아이템 수량 증가 함수
// increase를 여러 군데서 재사용하기 위해 분리(redux 내에서 타 reducers를 호출할 수 없기 때문에 별도의 함수로 분리함)
const increaseItem = (state, payload) => {
    const item = state.find((item) => item.id === payload.id);
    if (item) {
        item.count += 1;
    }
};

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers: {
    increase: (state, action) => {
        increaseItem(state, action.payload);
    },
    addItem: (state, action) => {
        const item = state.find(item => item.id === action.payload.id);
        if ( item ) {
            increaseItem(state, action.payload);
        } else {
            state.push(action.payload);
        }
    }
  }
});

export let { increase, addItem } = cart.actions;

export default cart;