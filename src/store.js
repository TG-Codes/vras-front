// store.js
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import rootReducer from "./reducers"; // You'll create this
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};
const axiosInstance = {};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

export default store;
