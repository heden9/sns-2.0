import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Button,
    Alert,
    LayoutAnimation,
    InteractionManager,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import Expo,{ Audio,Video } from 'expo';
import { cacheImages } from '../../config/cacheImg';
const url = [
    require('../../static/img/img/thumbs/1.jpg'),
    require('../../static/img/img/thumbs/2.jpg'),
    require('../../static/img/img/thumbs/3.jpg'),
    require('../../static/img/img/thumbs/4.jpg'),
    require('../../static/img/img/thumbs/5.jpg'),
    require('../../static/img/img/thumbs/6.jpg'),
    require('../../static/img/img/thumbs/7.jpg'),
    require('../../static/img/img/thumbs/8.jpg'),
    require('../../static/img/img/thumbs/9.jpg'),
    require('../../static/img/img/thumbs/10.jpg'),
    require('../../static/img/img/thumbs/11.jpg'),
    require('../../static/img/img/thumbs/12.jpg'),
    require('../../static/img/img/thumbs/13.jpg'),
    require('../../static/img/img/thumbs/14.jpg'),
    require('../../static/img/img/thumbs/15.jpg'),
    require('../../static/img/img/thumbs/16.jpg'),
    require('../../static/img/img/thumbs/17.jpg'),
    require('../../static/img/img/thumbs/18.jpg')
];
const bigUrl = [
    require('../../static/img/img/1.jpg'),
    require('../../static/img/img/2.jpg'),
    require('../../static/img/img/3.jpg'),
    require('../../static/img/img/4.jpg'),
    require('../../static/img/img/5.jpg'),
    require('../../static/img/img/6.jpg'),
    require('../../static/img/img/7.jpg'),
    require('../../static/img/img/8.jpg'),
    require('../../static/img/img/9.jpg'),
    require('../../static/img/img/10.jpg'),
    require('../../static/img/img/11.jpg'),
    require('../../static/img/img/12.jpg'),
    require('../../static/img/img/13.jpg'),
    require('../../static/img/img/14.jpg'),
    require('../../static/img/img/15.jpg'),
    require('../../static/img/img/16.jpg'),
    require('../../static/img/img/17.jpg'),
    require('../../static/img/img/18.jpg')
];
const CustomAnimation = {
    update: {
        duration: 1000,
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: .6
    }
};
const CustomAnimation2 = {
    update: {
        duration: 1000,
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: .6
    },
    create: {
        duration: 300,
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.opacity,
    },
    delete: {
        duration: 300,
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.opacity,
    }
};
const ROW = 6,
    COL = 3;
export default class Moments extends React.PureComponent{
    state = {
        stop: false,
        open: false,
        width: 200,
        appIsReady: false,
        nowIndex: 0
    };
    _handleVideoRef = component => {
        this._video = component;
        this._video.loadAsync(require('../../static/sound/linjunj.mp3'),{
            shouldPlay: this.state.stop,
            isLooping: true,
        },true);
    };
    componentWillMount(){
        // 初始化图片位置信息表
        this.imgInfo = [];
        for(let i = 0; i < ROW; i++){
            for(let j = 0; j < COL; j++){
                this.imgInfo.push({
                    col: j,
                    row: i
                });
            }
        }
        this._loadAssetsAsync();
    }
    _clickApple = (flag = true, IMGW = 100, IMGH = 100 ) => {
        const rowGap = (WindowInfo.width - IMGW * COL)/(COL + 1),
            colGap = (WindowInfo.height- 50 - IMGH * ROW)/(ROW + 1);
        this.imgInfo.map((item, index)=>{
            setTimeout(()=>{
                LayoutAnimation.configureNext(CustomAnimation);
                item.ref.setNativeProps({
                    style: {
                        borderWidth: 2,
                        width: IMGW,
                        height: IMGH,
                        top: (colGap + IMGH) * item.row + colGap,
                        left: (rowGap + IMGW) * item.col + rowGap,
                        // transform: [{ rotate: `${(Math.random() * 20 - 10)}deg`}]
                    }
                })
            }, flag ? (17-index)*100 : 0);
        });
        this._showNowImg(this.state.nowIndex, 0 ,0 );
    };
    _reset = () => {
        LayoutAnimation.configureNext(CustomAnimation);
        this.imgInfo.map(item=>{
            item.ref.setNativeProps({
                style: {
                    top: -100,
                    left: -100
                }
            })
        });
    };
    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
           this._clickApple();
        });
    }
    _clickSet = () => {
        this.state.open ? this._clickApple() : this._imgClick();
        this.setState({
            open: !this.state.open
        })
    };
    _imgClick = (index, IMGW = 50, IMGH = 50) => {
        const BIGW = IMGW * ROW,
            BIGH = IMGH * COL;
            BIG_GAP_W = (WindowInfo.width - BIGW)/2,
            BIG_GAP_H = (WindowInfo.height - 50 - BIGH)/2;
        this.imgInfo.map(item=>{
            item.ref.setNativeProps({
                style: {
                    borderWidth: 0,
                    width: IMGW,
                    height: IMGH,
                    top: BIG_GAP_H + IMGH * item.col,
                    left: BIG_GAP_W + IMGW * item.row,
                    // transform: [{ rotate: `0deg`}]
                }
            })
        });
        // InteractionManager.runAfterInteractions(()=>{
            this._showNowImg(index, WindowInfo.width, BIG_GAP_W);
        // });
    };
    _showNowImg = (nowIndex, BIG_GAP_W, BIG_GAP_H) => {
        this.setState({
            nowIndex
        });
        LayoutAnimation.configureNext(CustomAnimation2);
        this.bigImg.setNativeProps({
            style: {
                left: (WindowInfo.width - BIG_GAP_W)/2,
                top: (WindowInfo.height - 50 - BIG_GAP_H)/2,
                width: BIG_GAP_W,
                height: BIG_GAP_H
            }
        })
    };
    render(){
        if(!this.state.appIsReady){
            return <Expo.AppLoading />;
        }else{
            return(
                <View style={styles.container}>
                    {
                        this.state.open &&
                        <TouchableWithoutFeedback onPress={()=>{
                            this._clickApple();
                            this.setState({
                                open: !this.state.open
                            })
                        }}>
                            <View style={[styles.mask,{width: WindowInfo.width, height: WindowInfo.height}]}/>
                        </TouchableWithoutFeedback>
                    }
                    <Image
                        onLoad={()=>console.log('ok')}
                        ref={ref=>this.bigImg = ref}
                        style={[styles.bigImg,{top: (WindowInfo.height - 50)/2, left: (WindowInfo.width)/2,backgroundColor: 'white'}]}
                        source={bigUrl[this.state.nowIndex]}/>
                    {
                        this.imgInfo.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={index}
                                    onPress={()=>{
                                        !this.state.open ? this._imgClick(index,0,0) : this._clickApple(false);
                                        this.setState({
                                            open: !this.state.open
                                        })
                                    }}>
                                    <Image
                                        ref={ref=>{
                                            this.imgInfo[index].ref = ref;
                                        }}
                                        style={styles.img}
                                        source={url[index]}/>
                                </TouchableWithoutFeedback>

                            )
                        })
                    }
                </View>
            );
        }

    }
    async _loadAssetsAsync () {
        const imageAssets = cacheImages([].concat(url,bigUrl));
        await Promise.all([
            ...imageAssets
        ]);
        this.setState({appIsReady: true});
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: -100,
        left: -100,
        borderWidth: 2,
        borderColor: 'white'
    },
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.8)',
    },
    bigImg: {
        zIndex: 10,
        position: 'absolute',
        width: 0,
        height: 0,
        // borderWidth: 2,
        // borderColor: 'white'
    }
});