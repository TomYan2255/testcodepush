import { all } from "redux-saga/effects";
import nfcSaga from "../sagas/nfcSaga";
export default function* rootSaga() {
  yield all([nfcSaga()]);
}
