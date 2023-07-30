import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer";

const rootReducer = {
    users: userReducer
};

const store = configureStore({
    reducer: rootReducer
});

export default store;