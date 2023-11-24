import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { user, rating, numReviews, reviews, ...item } = action.payload;

      // Check if item being added to cart already exists
      const existItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      // If it already exists, update quantity
      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id ? item : cartItem
        );
        // Otherwise add it to the list
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Re-calculate and update the cart
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
