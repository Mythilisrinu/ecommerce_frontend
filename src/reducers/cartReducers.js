import {
  CART_ADD_ITEM,
  CART_GET_ITEMS,
  CART_REMOVE_ITEM,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_GET_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case CART_ADD_ITEM:
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};
