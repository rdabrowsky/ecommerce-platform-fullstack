import { createSlice } from '@reduxjs/toolkit';
import { add } from 'nodemon/lib/rules';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed();
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((current) => current._id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => (x._id === existItem._id ? item : x));
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      );
      // Calculate shipping price (if order is over $100 then free  else $10)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      // Calculate tax price (15%)
      state.taxPrice = addDecimals(Number((state.shippingPrice * 0.15).toFixed(2)));
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
