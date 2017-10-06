import React from 'react';
import {
    Image,
    View,
    Text,
    LayoutAnimation,
    TouchableWithoutFeedback
} from 'react-native';
export default function ImgBtn({size=18,onPress=()=>{},resizeMode="cover",url2,url,active}){
    return(
        <TouchableWithoutFeedback onPress={onPress}>
            {
                active ?
                    <Image source={url2} resizeMode={resizeMode} style={{width: size,height: size}} />:
                    <Image source={url} resizeMode={resizeMode} style={{width: size,height: size}} />
            }
        </TouchableWithoutFeedback>
    );
}