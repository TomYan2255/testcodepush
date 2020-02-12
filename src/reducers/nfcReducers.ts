import { NFC_SUPPORT, NFC_IS_ENABLED, NFC_SHOW_MESSAGE, NFC_HIDE_MESSAGE } from "../actions/types";
import { NfcActions} from '../actions/nfcAction' ;
export type State = {
  isSupported: Boolean;
  isEnabled: Boolean;
  modalIsVisible: Boolean;
  modalMessage: string;
};

const initialState = {
  isSupported: false,
  isEnabled: false,
  modalIsVisible: false,
  modalMessage: ""
};
const nfcReducer = (state: State = initialState, action: { type: NfcActions; payload: any }) => {
  console.log("get action!", action);
  switch (action.type) {
    case NFC_SUPPORT:
      return {
        ...state,
        isSupported: action.payload
      };
    case NFC_IS_ENABLED:
      return {
        ...state,
        isEnabled: action.payload
      };
    case NFC_SHOW_MESSAGE:
      return {
        ...state,
        modalMessage: action.payload,
        modalIsVisible: true
      };
    case NFC_HIDE_MESSAGE:
      return {
        ...state,
        modalMessage: "",
        modalIsVisible: false
      };

    default:
      return state;
  }
};

export default nfcReducer;
