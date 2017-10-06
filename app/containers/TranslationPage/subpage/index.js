import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Audio from '../../../components/AudioComponent';
export default class TranslateSubpage extends React.PureComponent{

    render(){
        return(
            <View style={styles.container}>
                <Text>subpage</Text>
                <Audio />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    }
});