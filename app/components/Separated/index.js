import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginLeft: 10,
        color: '#9e9e9e'
    }
});
export default function Separated ({height=15,title}){
    return(
        <View style={[styles.container,{height}]}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}