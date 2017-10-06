import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
const source = require('../../static/lottie/empty_status.json');
export default class App extends React.Component {
    state = {
        animation: null,
    };

    componentDidMount() {
        this.animation.play();
    }

    render() {
        return (
            <View style={styles.image_area}>
                <View style={styles.animationContainer}>
                    <Lottie
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={styles.lottie}
                        loop={true}
                        source={source}
                    />
                </View>
                <Text style={styles.text_title}>{this.props.title}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    image_area: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    animationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 280,
        height: 200,
    },
    lottie: {
        width: 280,
        height: 200,
    },
    text_title: {
        color: '#bbbbce',
        fontSize: 18,
    }
});