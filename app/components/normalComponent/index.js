import React from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
export function TouchBtn({style, children, onPress=()=>{}}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View>
                <Text style={style}>{children}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}