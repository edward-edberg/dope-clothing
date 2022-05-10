import { createStore, applyMiddleware, Middleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState());

//   next(action);

//   console.log("next state: ", store.getState());
// };
type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));
// ].filter(Boolean);

// const composeEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.window.__REDUX_DEVTOOLS_EXTENSION__) ||
//   compose;

// const composedEnhancers = compose(
//   applyMiddleware(...middleWares),
//   process.env.NODE_ENV === "production" && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// process.env.NODE_ENV === "development" &&
//   window.__REDUX_DEVTOOLS_EXTENSION__();

// export const store = createStore(persistedReducer, composedEnhancers);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
