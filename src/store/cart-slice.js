import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  //slice name
  name: "cart",

  //slice properties
  initialState: {
    items: [],
    totalQuantity: 0,

    //change for manage useEffect on fetch and PUT data
    //when fetch => cart change => trigger useEffect of PUT
    changed: false
  },

  //reducers contains actions to dispatch
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },

    addItemToCart(state, action) {
      //item passed in
      const newItem = action.payload;

      //check if item is exist on cart already
      const existingItem = state.items.find((item) => item.id === newItem.id);

      //always add 1 to overall
      state.totalQuantity++;

      state.changed = true

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeItemFromCart(state, action) {
      //takes item's id as parameter
      const id = action.payload;
      state.totalQuantity--;
      const existingItem = state.items.find((item) => item.id === id);

      state.changed = true
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});



export const cartActions = cartSlice.actions;

export default cartSlice;
