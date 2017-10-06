import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    Alert,
    TouchableHighlight
} from 'react-native';
import { observer } from 'mobx-react';
import UserInfo from '../../../mobx/store';
import LoginPng from '../../../static/img/login.png';
import { login } from '../../../fetch/Login/login';
@observer
export default class LoginPage extends React.Component{
    constructor(props, context){
        super(props,context);
        this.state = {
            account: '',
            password: ''
        };
    }
    changeHandle = (Text,name) =>{
        this.setState({
            [name]: Text
        });
    };
    checkLogin = () => {
        if(!this.state.account || !this.state.password)
            alert('请输入账号密码');
        else{
            const result = login({name: this.state.account,pwd: this.state.password});
            console.log(result);
            result.then((res)=>res.json())
                .then((json)=>{
                if(json == null)
                    return;
                if(json == false)
                    Alert.alert('账号或密码错误');
                else{
                    UserInfo.login(json);
                    Alert.alert(
                        '亲，登录成功！',
                        '',
                        [
                            {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        { cancelable: false }
                    );
                }
            })
                .catch((err)=>{
                    console.warn(err);
                    Alert.alert('网络超时TnT');
            });
        }
    };
    render(){
        return(
            <View style={styles.container}>
                <Text style={[{margin: 10},styles.Text]}>登录后可多端同步、享受更多的学习资源</Text>
                <View style={[styles.form,{width: WindowInfo.width * .9}]}>
                    <InputComponent
                        style={{borderTopLeftRadius: 4,borderTopRightRadius: 4}}
                        title={'账号：'}
                        placeHolder={'网易邮箱（163邮箱）'}
                        name={'account'}
                        onChange={this.changeHandle}/>
                    <InputComponent
                        secure={true}
                        title={'密码：'}
                        name={'password'}
                        placeHolder={'密码'}
                        onChange={this.changeHandle}/>
                    <LoginBtn onPress={this.checkLogin}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        marginTop: 10,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderBottomWidth: 1,
    },
    Text: {
        fontSize: 12,
        color: 'grey'
    },
    input: {
        color: 'grey',
        fontSize: 13,
        height: 45,
        flex: 1
    }
});

const InputComponent = (props) => {
    const {style, title, placeHolder, onChange, secure, name} = props;
    return (
        <View style={[style,styles.inputRow]}>
            <Text style={styles.Text}>{title}</Text>
            <TextInput
                style={styles.input}
                underlineColorAndroid={'transparent'}
                placeholder={placeHolder}
                secureTextEntry={secure}
                onChangeText={(Text)=>onChange(Text,name)}/>
        </View>
    )
};

const LoginBtn = (props) => (
    <TouchableHighlight
        onPress={props.onPress}
        underlayColor={'#eee'}
        style={[styles.inputRow,{borderBottomLeftRadius: 4,borderBottomRightRadius: 4,height: 45,borderBottomWidth: 0}]}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
            <Image source={LoginPng} style={{height: 15,width: 15}}/>
            <Text style={{color: 'rgb(252,80,87)'}}>登录</Text>
        </View>
    </TouchableHighlight>
);