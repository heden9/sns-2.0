import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
export default class TranslateHeader extends React.PureComponent{
    render() {
        // if(Platform.OS === 'android')
        //     height:
        return (
            <View style={[styles.container,{width: WindowInfo.width}]}>
                <Text style={{color: 'white',fontSize: 15}}>中英互译</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42b5fb',
        paddingTop: 15,
        height: 65
    }
});

