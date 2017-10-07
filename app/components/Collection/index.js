import React from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Image,
    Platform,
} from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
let containerW = 25;
let androidStyle = {};
if (Platform.OS === 'android') {
    containerW = 100;
    androidStyle = {
        right: -containerW/3,
        top: -containerW/2+5,
        position: 'absolute'
    }
}
const styles = StyleSheet.create({
   container: {
       width: containerW,
       height: containerW,
       overflow: 'visible',
       ...androidStyle,
   },
    container2: {
        width: 25,
        height: 25,
    },
    lottie: {
        position: 'absolute',
        zIndex: 999,
        top: -44,
        left: -44,
        width: 200,
        height: 200,
    }
});
const source = require('../../static/lottie/TwitterHeart.json');
export default class App extends React.Component {
    state = {
        initialState: this.props.isCollected
    };
    pressHandle = () => {
        if(!this.props.needImage){
            if(!this.props.isCollected)
                this.animation.play();
            else{
                this.animation.reset();
            }
        }
        this.props.onPress();
    };
    componentDidMount(){
        this.animation && this.props.isCollected && this.animation.play();
    }
    render() {
        console.log(this.props.needImage);
        return (
            <TouchableWithoutFeedback onPress={this.pressHandle}>
                <View style={this.props.needImage ? styles.container2 : styles.container}>
                    {/*<View style={styles.test}/>*/}
                    {
                        this.props.needImage ? <Image style={styles.container2} resizeMode={'contain'} source={require('../../static/img/heart_03.png')}/>:
                            <Lottie
                                ref={animation => {
                                    this.animation = animation;
                                }}
                                speed={2.5}
                                style={styles.lottie}
                                source={source}
                            />
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }

}