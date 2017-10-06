import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import Badge from '../Badge';
export default function PersonPage({onPress, iconName, badge, title }){
    return (
        <TouchableHighlight onPress={onPress}  underlayColor={'#eee'} style={styles.btnContainer}>
            <View style={{flexDirection: 'row'}}>
                <SimpleLineIcons name={iconName} size={15} color={'grey'} style={{marginLeft: 10}}/>
                <Text style={{marginLeft: 10,flex: 1}}>{title}</Text>
                {
                    badge && badge > 0 ? <Badge num={badge}/> : null
                }
                <SimpleLineIcons name='arrow-right' size={15} style={{marginLeft: 5}} color={'#ccc'}/>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 10,
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowOffset: {width:1,height:1},
        shadowRadius: 1
    },
});



