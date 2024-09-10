// store.js
import rootReducer from "./reducer/authReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ rootReducer });

export default store;
