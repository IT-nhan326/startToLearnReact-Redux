import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector } from 'react-redux'

function App() {

  //to drill into central store and get the properties of a slice base on slice.name.properties
  const showCart = useSelector(state => state.ui.cartIsVisible)

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
