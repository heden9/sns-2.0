import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function Moments() {
    return (
        <View style={style.container}>
            <Text>Moments</Text>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    }
});