import NfcManager, { NfcTech, nfcManager } from "react-native-nfc-manager";
import { Platform } from "react-native";
//test pinCode
const HASHED_PIN_CODE = "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f";
//ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f
//eef30647d28ea37791c73e9ee10e982ee0eebf8f13cd29b144f5f1c4d8ef7596
//test data
const BACKUP_DATA = "0987654321";

export default class NfcUtils {
  _start = (): Promise<boolean> => {
    return NfcManager.start();
  };

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest();
  };

  _isSupported = async (): Promise<boolean> => {
    return NfcManager.isSupported();
  };

  _isEnabled = async (): Promise<boolean> => {
    return NfcManager.isEnabled();
  };
  _registerTagEvent = callback => {
    NfcManager.registerTagEvent(tag => {
      callback(tag);
    });
  };

  getTech = () => {
    return Platform.OS === "ios" ? NfcTech.MifareIOS : NfcTech.IsoDep;
  };
  requestTechnology = async (tech): Promise<void> => {
    return NfcManager.requestTechnology(tech);
  };

  getTag = async (): Promise<void> => {
    return nfcManager.getTag();
  };

  stringToByte = str => {
    var bytes = new Array();
    var len, c;
    len = str.length;
    for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10ffff) {
        bytes.push(((c >> 18) & 0x07) | 0xf0);
        bytes.push(((c >> 12) & 0x3f) | 0x80);
        bytes.push(((c >> 6) & 0x3f) | 0x80);
        bytes.push((c & 0x3f) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00ffff) {
        bytes.push(((c >> 12) & 0x0f) | 0xe0);
        bytes.push(((c >> 6) & 0x3f) | 0x80);
        bytes.push((c & 0x3f) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007ff) {
        bytes.push(((c >> 6) & 0x1f) | 0xc0);
        bytes.push((c & 0x3f) | 0x80);
      } else {
        bytes.push(c & 0xff);
      }
    }
    return bytes;
  };

  byteToString = arr => {
    if (typeof arr === "string") {
      console.log("string");
      return arr;
    }
    var str = "",
      _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
        v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
        var bytesLength = v[0].length;
        var store = _arr[i].toString(2).slice(7 - bytesLength);
        for (var st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2);
        }
        str += String.fromCharCode(parseInt(store, 2));
        i += bytesLength - 1;
      } else {
        str += String.fromCharCode(_arr[i]);
      }
    }
    return str;
  };

  toHexString = (byteArray: number[]) => {
    return Array.from(byteArray, function(byte: number) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    }).join("");
  };
  //6390 卡片被lock
  //6370 需要先backup
  //6330 pin設了
  //6350 pin code打錯
  _genBackupCommands = (): string => {
    let command = "80320500"; //ca in p1 p2 0A(data length) pincode(32bytes) data(x bytes)
    const data = this.stringToByte(BACKUP_DATA);
    const hexData = this.toHexString(data);
    const dataLength = HASHED_PIN_CODE.length / 2 + hexData.length / 2;
    command = command.concat(dataLength.toString(16).padStart(2, "0"));
    command = command.concat(HASHED_PIN_CODE);
    command = command.concat(hexData);
    // const command = "803205002AEF797C8118F02DFB649607DD5D3F8C7623048C9C063D532CC95C5ED7A898A64F30393837363534333231";
    console.log("_genBackupCommands command = ", command);
    return command;
  };

  _genRestoreCommands = (): string => {
    let command = "80340000";
    const dataLength = HASHED_PIN_CODE.length / 2;
    command = command.concat(dataLength.toString(16).padStart(2, "0"));
    command = command.concat(HASHED_PIN_CODE);
    console.log("_genRestoreCommands command = ", command);
    return command;
  };

  _genResetCommands = (): string => {
    const command = "80360000";
    console.log("_genResetCommands command = ", command);
    return command;
  };

  _sendCommand = (commands: string): Promise<string> => {
    if (Platform.OS === "ios") {
      return NfcManager.sendMifareCommandIOS(commands);
    }
    return NfcManager.transceive(commands);
  };
}
