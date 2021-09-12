import classes from './CartButton.module.css';

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {

  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  //declare dispatch hooks (dispatch function provide by redux) for later uses
  const dispatch = useDispatch()

  const toggleCartHandler = () => {
    //dispatch an action from ui-slice
    dispatch(uiActions.toggle())
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
