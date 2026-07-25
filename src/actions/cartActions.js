import axios from "axios";
import {
  CART_GET_ITEMS,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const getCart = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.access}`,
    },
  };

  const { data } = await axios.get("/api/cart/", config);
  console.log("cart data in action get", data);
  dispatch({
    type: CART_GET_ITEMS,
    payload: data.items,
  });
};

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  console.log("user info", userInfo);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.access}`,
    },
  };

  const { data } = await axios.post(
    "/api/cart/add/",
    {
      product: productId,
      quantity: qty,
    },
    config,
  );

  dispatch({
    type: CART_ADD_ITEM,
    payload: data.items,
  });
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.access}`,
    },
  };

  const { data } = await axios.delete(`/api/cart/remove/${productId}/`, config);

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: data.items,
  });
};
