import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default function Badge(props){
    return(
        <View style={styles.badge}>
            <Text style={{color: 'white',fontSize:10,textAlign:'center',lineHeight: 14,fontWeight: 'bold'}}>{props.num || (props.num > 99 ? '99+' : props.num)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        overflow: 'hidden',
        borderRadius: 50,
        marginTop: 1,
        paddingHorizontal: 3,
        minWidth: 15,
        height: 15,
        backgroundColor: 'rgb(248,63,29)',
    }
});