import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from './store/cart-action'

let initialState = true

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  //to drill into central store and get the properties of a slice base on slice.name.properties
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    
    // stop fetching "PUT" when starting the app for the 1st time
    if (initialState){
      initialState = false
      return
    }
    if (cart.changed){
      //redux accept action creator thunk
      dispatch(sendCartData(cart))
    }

    //although useEffect also depends on dispatch but React make sure dispatch function never change
  }, [cart, dispatch]);

  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch])

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
