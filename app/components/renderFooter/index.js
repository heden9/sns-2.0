import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    footer: {
        position: 'relative',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footer_title: {
        marginTop: 15,
        paddingHorizontal: 15,
        color: '#9e9e9e'
    },
    line: {
        position: 'absolute',
        borderTopWidth: 1,
        borderTopColor: '#dcdcdc',
        backgroundColor: 'red',
        width: '85%',
        top: 22
    }
});
export default function Footer() {
    return (
        <View style={styles.footer}>
            <View style={styles.line}/>
            <Text style={styles.footer_title}>我是有底线的</Text>
        </View>
    )
}