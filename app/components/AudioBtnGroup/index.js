import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import ImgBtn from '../ImgBtn';
import Expo, { Audio, Video } from 'expo';
import happy from '../../static/img/happy.png';
import shutUp from '../../static/img/shutUp.png';
import loading from '../../static/img/loading.png';
export default class AudioBtnGroup extends React.PureComponent{
    constructor(props, context){
        super(props, context);
        this.state = {
            loadState: 1,
            click: false
        };
    }
    singHandle = () => {
    };
    //播放结束
    loadFinished = () => {
        alert('finished');
    };
    loadError = () => {
        alert('err');
    };
    _iosVideo = () => {
        return (
            <Video
                source={{ uri: this.props.speakUrl }}
                useNativeControls={true}
                onLoadStart={()=>alert('start')}
                onLoad={this.loadFinished}
                onError={this.loadError}
            />
        );
    };
    renderImgBtn = () => {
        const state = this.state.loadState;
        if(state === 1 ){
            //初始状态
            return <ImgBtn url={happy} onPress={this.singHandle}/>;
        }else if(state === 2){
            //加载状态
            return <ImgBtn url={loading}/>;
        }else if(state === 3){
            //加载失败
            return <ImgBtn url={shutUp}/>;
        }
    };
    render(){
        return(
            <View>
                {/*{*/}
                    {/*this.renderImgBtn()*/}
                {/*}*/}
                {/*{*/}
                    {/*//点击后加载音频*/}
                    {/*this.state.click ?*/}
                        {/*this._iosVideo()*/}
                        {/*:null*/}
                {/*}*/}
                {
                    this._iosVideo()
                }
            </View>
        );
    }
}
