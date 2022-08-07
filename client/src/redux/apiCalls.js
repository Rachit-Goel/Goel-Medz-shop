import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { addProduct, emptyCart } from "./cartRedux";
import { publicRequest } from "../requestMethods";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    
    await dispatch(loginSuccess(res.data));
    console.log("user stored");
    return res.data
  } catch (err) {
    console.log("err in login store = ",err)
    dispatch(loginFailure());
  }
};

export const getCart = async (dispatch, user) => {
  try {
    // const res = await userRequest.get(`/carts/find/${user._id}`);
    const res = await axios.get(`http://goel-medz-shop.herokuapp.com/api/carts/find/${user._id}`, {
      headers: {
        token: 'Bearer ' + user.accessToken
      }
    })
    let count = 1;
    const carts = res.data
    carts.forEach((cart)=>{
      cart.products.forEach(async (product) => {
        const prodDetails = await publicRequest.get("/products/find/" + product.productId);
        const jsonobj = { ...prodDetails.data, "quantity": product.quantity }
        dispatch(addProduct(jsonobj));
        console.log(count," product added")
        count++;
      })
    })
    return res.data.products
  } catch (err) {
    console.log("err in getCart", err)
  }
};

export const saveCart = async (dispatch, cartdata, user) => {
  try {
    await axios.post("http://goel-medz-shop.herokuapp.com/api/carts/", cartdata, {
      headers: {
        token: 'Bearer ' + user.accessToken
      }
    })
  } catch (err) {
    console.log("err in saveCart", err)
  }
};

export const deleteCart = async (dispatch, user) => {
  try {
    await axios.delete("https://goel-medz-shop.herokuapp.com/api/carts/" + user._id, {
      headers: {
        token: 'Bearer ' + user.accessToken
      }
    })
    dispatch(emptyCart());
  } catch (err) {
    console.log("err in deleteCart", err)
  }
};

export const deleteCartProduct = async (dispatch, pid, user) => {
  try {
    await axios.delete("https://goel-medz-shop.herokuapp.com/api/carts/" + user._id, {
      headers: {
        token: 'Bearer ' + user.accessToken
      },
      body: {
        "pid" : pid
      }
    })
    dispatch(emptyCart());
  } catch (err) {
    console.log("err in deleteCart", err)
  }
};