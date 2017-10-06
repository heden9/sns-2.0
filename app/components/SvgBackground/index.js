import React from 'react';
import {
    View
} from 'react-native';
import {Svg} from 'expo';
const {
    LinearGradient,
    Stop,
    Defs,
    Rect
} = Svg;
export default class SvgBackground extends React.PureComponent {
    render(){
        return(
            <View style={{position: 'relative',height: this.props.style.height}}>
                  <Svg
                    height="150"
                    width={WindowInfo.width} style={{position: 'absolute',top: 0, left: 0}}>
                    <Defs>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="10%" y2="100%">
                            <Stop offset="0%" stopColor="#5490fc" stopOpacity="1" />
                            <Stop offset="99%" stopColor="#36c2fb" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#42b5fb" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Rect x="0"
                          y="0"
                          width={WindowInfo.width}
                          height="150" fill="url(#grad)" />

                </Svg>
                <View style={this.props.style}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}