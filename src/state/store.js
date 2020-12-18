import { createStore } from "redux";
import productListReducer from "./RootReducer";

export default createStore(productListReducer);