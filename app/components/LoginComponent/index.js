import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SvgBackground from '../SvgBackground';
import defaultImg from '../../static/img/Drum.png';
export default class LoginComponent extends React.PureComponent{
    render() {
        return (
            <SvgBackground style={{height: 150}}>
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={styles.header}>
                        <View>
                            <Text style={{fontSize: 25,color: 'white'}}>{this.props.name || '登录'}</Text>
                            <Text style={{marginTop: 10,fontSize: 12,color: 'white'}}>{this.props.name ? '查看或编辑个人资料' : '立即登录，解锁更多实用功能'}</Text>
                        </View>
                        <View style={styles.HeadPortrait}>
                            {
                                this.props.name ?
                                    <Image source={this.props.img || defaultImg} style={{height: 60,width: 60}}/>:
                                    <Icon name='user-circle' size={60} color={'#eee'}/>
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SvgBackground>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        height: 150,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    HeadPortrait:{
        overflow: 'hidden',
        width:60,
        height:60,
        backgroundColor: 'white',
        borderRadius: 50
    }
});

