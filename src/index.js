import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store/store";

ReactDOM.render(
    //provide redux store to all the Components
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
