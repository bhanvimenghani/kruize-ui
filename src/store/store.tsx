import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import {rootReducer} from "@reducers/index";

const middleware: any = [];
middleware.push(createLogger());
const enhancers = [...middleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    window.location.hostname === "localhost"
      ? getDefaultMiddleware().concat(enhancers)
      : getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export default store;