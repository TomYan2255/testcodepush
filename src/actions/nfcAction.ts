import { NFC_HIDE_MESSAGE, NFC_IS_ENABLED, NFC_SHOW_MESSAGE, NFC_SUPPORT } from "./types";
import { INfcIsSupported, INfcIsEnabled, INfcShowMessage } from "../types/nfc";
type Actions =
  | typeof NFC_HIDE_MESSAGE
  | typeof NFC_IS_ENABLED
  | typeof NFC_SHOW_MESSAGE
  | typeof NFC_SUPPORT;

interface IActionType {
  type: Actions;
  payload?: any;
}
export const nfcSupported = (payload: INfcIsSupported): IActionType => {
  return {
    type: NFC_SUPPORT,
    payload: payload
  };
};

export const nfcIsEnabled = (payload: INfcIsEnabled): IActionType => {
  return {
    type: NFC_IS_ENABLED,
    payload: payload
  };
};

export const nfcShowMessage = (payload: INfcShowMessage): IActionType => {
  return {
    type: NFC_SHOW_MESSAGE,
    payload: payload
  };
};

export const nfcHideMessage = payload => {
  return {
    type: NFC_HIDE_MESSAGE,
    payload: payload
  };
};

export {
    Actions as NfcActions
  }