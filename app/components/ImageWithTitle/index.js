import React from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function ImageWithTitle({source,style,title}) {
    return (
        <View style={[styles.container,style]}>
            <Image source={source} style={styles.img}/>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 30,
        height: 30
    },
    title: {
        backgroundColor: 'transparent',
        color: '#9e9e9e'
    }
});