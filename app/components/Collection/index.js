import React from 'react';
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Image,
    Animated,
} from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
const containerW = 25;
const styles = StyleSheet.create({
   container: {
       width: containerW,
       height: containerW,
       position: 'relative',
   },
    lottie: {
        position: 'absolute',
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
        return (
            <TouchableWithoutFeedback onPress={this.pressHandle}>
                <View style={styles.container}>
                    {
                        this.props.needImage ? <Image style={styles.container} resizeMode={'contain'} source={require('../../static/img/heart_03.png')}/>:
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