/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from "react";

import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import NfcManager, { Ndef } from "react-native-nfc-manager";
import NfcTest from "./src/components/nfcTest/NfcTest";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions, PixelRatio } from "react-native";
import { defaultStyles } from "./src/style/style";
import CodePush from 'react-native-code-push';
const codePushOptions = {
  // 设置检查更新的频率
  // ON_APP_RESUME APP 恢复到前台的时候
  // ON_APP_START APP 开启的时候
  // MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: true,
  installMode: CodePush.InstallMode.IMMEDIATE
}
class App extends React.Component {

  render () {
    return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <NfcTest></NfcTest>
      <SafeAreaView />
    </Fragment>
    );
  }

  async componentWillMount () {
    CodePush.disallowRestart();
    this.update();
  }

  componentDidMount () {
    CodePush.allowRestart();
  }

  update = () => {
    const deploymentKey = '7986b5bee9b2212f0677de273d648e8fdd3599be';
  
    CodePush.checkForUpdate(deploymentKey).then(update => {

    });
    
  }
 
}


App = CodePush(codePushOptions)(App);


export default App;
