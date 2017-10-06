import React from 'react';
import {
    View,
    Image,
    ImageBackground,
    StyleSheet
} from 'react-native';
export default class ImgBackground extends React.PureComponent{
    render(){
        return(
            <ImageBackground source={{uri:this.props.url}} style={style.container} resizeMethod={'scale'}>
                <View style={{position: 'absolute',flex: 1}}>
                    {this.props.children}
                </View>
            </ImageBackground>
        );
    }
}
const style = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(54,57,66)',
    }
});