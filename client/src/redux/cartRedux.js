import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    addProducts: (state, action) => {
      action.payload.forEach((product) => {
        state.quantity += product.quantity;
        state.products.push(product);
        state.total += product.price * product.quantity;
      })
    },
    deleteProduct: (state, action) => {
      state.products.splice(
        state.products.findIndex((i) => i._id === action.payload.id),
        1
      );
      state.quantity -= 1;
      state.total -= action.payload.price;
    },
    emptyCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    incProductQuantity: (state, action) => {
      state.products.forEach((product) => {
        if(product._id === action.payload.id){
          product.quantity+=1;
          state.quantity+=1;
          state.total += action.payload.price;
        }
      })
    },
    decProductQuantity: (state, action) => {
      state.products.forEach((product) => {
        if(product._id === action.payload.id){
          product.quantity-=1;
          state.quantity-=1;
          state.total -= action.payload.price;
        }
      })
    }
  },
});

export const { addProduct, addProducts, deleteProduct, emptyCart, incProductQuantity, decProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;
