import { uiActions } from "./ui-slice";

import { cartActions } from "./cart-slice";

//redux/toolkit not only accept action(object)-reducers but also accept action(function)-thunk
//=> action creator thunk to manage actions such as sideEffect
//"PUT" data to db
export const sendCartData = (cart) => {
  return async (dispatch) => {
    //dispatch action show noti during fetching
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending",
        message: "sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://reduxjs-toolkit-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          //PUT override existing data on db
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      //catch error during fetching
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await sendRequest();

      //dispatch action show noti when fetching success
      dispatch(
        uiActions.showNotification({
          status: "sucess",
          title: "Success !!",
          message: "sucess sending cart data",
        })
      );
    } catch (error) {
      //dispatch action show noti when catching any error occur during fetch
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Failed to send cart data",
        })
      );
    }
  };
};

//fetching data from db
export const fetchCartData = () => {
  return async (dispatch) => {
    //return a await function to catch error
    const fetchData = async () => {
      const response = await fetch(
        "https://reduxjs-toolkit-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = await response.json();

      return data;
    };

    try {
      //due to 'PUT' data from db will be formatted equal with data format of a cart (initialState format of cart-slice)
      //=> cartData fetched will have the same format when we passed it into replaceCart()
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({

        //
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
      }));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Failed to fetch cart data",
        })
      );
    }
  };
};
