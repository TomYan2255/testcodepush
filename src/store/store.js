import { createStore, applyMiddleware, combineReducers } from "redux";
import nfcReducers from "../reducers/nfcReducers";

import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));
const rootReducer = combineReducers({
  nfc: nfcReducers
});

const configureStore = () => {
  return createStore(rootReducer, enhancers);
};
const store = configureStore();

sagaMiddleware.run(rootSaga);

export default store;
