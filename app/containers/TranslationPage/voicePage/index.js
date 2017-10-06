import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
import EmptyStatus from '../../../components/emptyStatus';
export default class App extends React.Component {
    state = {
        animation: null,
    };
    render() {
        return (
            <View style={styles.animationContainer}>
                <EmptyStatus title={"敬请期待哦:)"}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});