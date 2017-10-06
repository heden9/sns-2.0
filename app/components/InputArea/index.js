import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { FontAwesome, Entypo } from '@expo/vector-icons';
import ImgBtn from '../ImgBtn';
export default class InputArea extends React.PureComponent{
    render(){
        return(
            <View style={styles.fatherBox}>
                <View style={styles.container}>
                    <TextInput
                        style={{height: 130,flex: 1,fontSize: 14}}
                        multiline={true}
                        onChangeText={this.props.changeHandle}
                        value={this.props.areaValue}
                        placeholderTextColor={'#ccc'}
                        underlineColorAndroid={'transparent'}
                        numberOfLines={5}
                        returnKeyType={'done'}
                        blurOnSubmit={true}
                        onSubmitEditing={this.props.submitHandle}
                        placeholder={'在此输入要翻译的文本'}/>
                </View>
                <View style={styles.BtnGroup}>
                    <TouchableHighlight onPress={this.props.singHandle} underlayColor={'#eee'} style={styles.VoiceBtn}>
                        <View style={styles.voiceBar}>
                            <FontAwesome name='microphone' size={13} color={'rgb(239,79,93)'}/>
                            <Text style={styles.voiceBar_text}>语音翻译</Text>
                        </View>
                    </TouchableHighlight>
                    {
                        this.props.areaValue ?
                            <TouchableHighlight  onPress={this.props.clearHandle} >
                                <Entypo name="cross" size={30} color="grey"/>
                            </TouchableHighlight> : null
                    }
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    fatherBox: {
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowOffset: {width:1,height:1},
        shadowRadius: 1
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white'
    },
    BtnGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: Dimensions.get('window').width
    },
    VoiceBtn: {
        padding: 5,
        backgroundColor: 'rgba(254,240,241,.8)',
        borderRadius: 15,
    },
    voiceBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    voiceBar_text: {
        color: 'rgb(239,79,93)',
        fontSize: 13
    }
});