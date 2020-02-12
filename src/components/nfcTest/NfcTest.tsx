
import React, { Component, } from 'react';
import { View, Text, Platform, NativeModules, Button, NativeEventEmitter, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { nfcSupported, nfcIsEnabled, nfcHideMessage, nfcShowMessage } from '../../actions/nfcAction';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from "react-native-modal";
import NfcUtils from '../../utils/NfcUtils';
import { f2fBase64 } from '../../images/base64Fie.js';
import SvgUri from 'react-native-svg-uri';
import { f2f_icon } from '../../images/svg';

const HASHED_PIN_CODE = "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f";
//ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f
//eef30647d28ea37791c73e9ee10e982ee0eebf8f13cd29b144f5f1c4d8ef7596
const BACKUP_DATA = "0987654321";

const nfcUtils = new NfcUtils();
const nfcModule = Platform.OS == "ios" ? {} : NativeModules.BleModule;;
let nfcEventEmitter: any = {};

interface nfcTestProps {
    nfcSupported: Function
    nfcIsEnabled: Function
    nfcHideMessage: Function
    nfcShowMessage: Function
    isSupported: Boolean
    isEnabled: Boolean
    isVisible: boolean,
    message: string,
}

interface nfcTestState {

}


class nfcTest extends Component<nfcTestProps, nfcTestState> {
    constructor(props: nfcTestProps) {
        super(props);
        this.state = {

        };

    }

    renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={styles.modalContentTitle}>{this.props.message}</Text>
            <Button
                onPress={() => this.props.nfcHideMessage()}
                title="Close"
            />
        </View>
    );
    render() {
        const { content, font, logoContainer } = styles;
        return (

            <View style={content} >

                <View style={{ padding: 20 }}>
                    <Text>2/123123213123123</Text>

                    <TouchableOpacity
                        style={{ padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black' }}
                        onPress={() => {
                            this._test(nfcUtils._genBackupCommands());
                        }}
                    >
                        <Text>Backup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black' }}
                        onPress={() => {
                            this._test(nfcUtils._genRestoreCommands());
                        }}
                    >
                        <Text>Restore</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black' }}
                        onPress={() => {
                            this._test(nfcUtils._genResetCommands());
                        }}
                    >
                        <Text>Reset</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ padding: 10, width: 200, margin: 20, borderWidth: 1, borderColor: 'black' }}
                        onPress={nfcUtils._cleanUp}
                    >
                        <Text>Cancel Test</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 10, paddingVertical: 10, alignItems: 'center' }}>
                    <Text style={font}>
                        is support nfc ? = {this.props.isSupported.toString()}
                    </Text>

                </View>
               
                <Modal isVisible={this.props.isVisible}>
                    {this.renderModalContent()}
                </Modal>
            </View>

        );
    }

    async componentDidMount() {
        nfcUtils._start();
        if (Platform.OS == 'android') {
            nfcEventEmitter = new NativeEventEmitter(nfcModule);
            nfcEventEmitter.addListener("NfcManagerStateChanged", this._handleNfcStateChanged);
        }
        this.setNfcIsEnable();
        this.setNfcSupport();
        nfcUtils._registerTagEvent(this.listen());
    }

    _handleNfcStateChanged = (data: { state: string }) => {
        console.log("_handleNfcStateChanged state", data);
        if (data.state === "off") {
            // this.setState({
            //     isVisible: true,
            //     message: 'nfc is not enabled'
            // });
        }
    };

    async setNfcSupport() {
        const isSupported = await nfcUtils._isSupported();
        this.props.nfcSupported(isSupported);
    }

    async setNfcIsEnable() {
        const _isEnabled = await nfcUtils._isEnabled();
        this.props.nfcIsEnabled(_isEnabled);
    }

    componentWillUnmount() {
        nfcUtils._cleanUp();
        if (Platform.OS == 'android')
            nfcEventEmitter.removeListener("NfcManagerStateChanged", this._handleNfcStateChanged);
    }

    listen = () => {
        // console.log('listen', tag)
    }

    _test = async (commands: string) => {
        try {
            const { isSupported, isEnabled, nfcShowMessage } = this.props
            if (!isSupported) {
                nfcShowMessage('your device is not supported for NFC')
                return;
            }
            if (!isEnabled) {
                nfcShowMessage('nfc is not enabled')
                return;
            }
            const tech = nfcUtils.getTech();
            await nfcUtils.requestTechnology(tech);

            //get se version
            await nfcUtils._sendCommand("00A4040006C1C2C3C4C5C6");//select 3rd card manager
            const resp = await nfcUtils._sendCommand(commands);

            if (resp.length > 10)  //not cmd
                nfcShowMessage('result : ' + nfcUtils.byteToString(resp))
            else
                nfcShowMessage('result : ' + nfcUtils.toHexString(resp))
        } catch (ex) {
            nfcShowMessage(ex)
        }
        finally {
            nfcUtils._cleanUp();
        }
    }



}

const mapStateToProps = (state) => {
    return {
        isSupported: state.nfc.isSupported,
        isEnabled: state.nfc.isEnabled,
        isVisible: state.nfc.modalIsVisible,
        message: state.nfc.modalMessage
    }
}
const mapDispatchToProps = {
    nfcSupported,
    nfcIsEnabled,
    nfcShowMessage,
    nfcHideMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(nfcTest);

const styles = EStyleSheet.create({
    content: {
        backgroundColor: "$bgColor",
        flex: 1
    },
    font: {
        fontSize: '16 rem'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContentTitle: {
        fontSize: 20,
        marginBottom: 12,
    },
    logoContainer: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        marginBottom: 40
    },
});
