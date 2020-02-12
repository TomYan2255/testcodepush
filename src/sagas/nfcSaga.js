import { takeLatest, select, call, put } from "redux-saga/effects";
import { GET_TAG,NFC_SUPPORT } from "../actions/types";

export default function* getNfcTag() {
  yield takeLatest(NFC_SUPPORT, getTag);
}

export function* getTag(action) {
  try {
    console.log("getTag", action);
    yield put( { type: "ACTION_ERROR" , "data" :"123" } );
  } catch (error) {
    yield put({ type: "ACTION_ERROR", error });
  }
}
