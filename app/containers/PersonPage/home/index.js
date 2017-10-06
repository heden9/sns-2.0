import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import LoginComponent from '../../../components/LoginComponent';
import PersonBtn from '../../../components/PersonPage_btn';
import Sep from '../../../components/Separated';
import UserInfo from '../../../mobx/store';
import { observer } from 'mobx-react';
import Expo from 'expo';
import { SimpleLineIcons } from '@expo/vector-icons';
function cacheFonts(fonts) {
    return fonts.map(font => Expo.Font.loadAsync(font));
}

@observer
export default class PersonPage extends React.Component{
    state = {
        appIsReady: false,
    };
    componentWillMount() {
        this._loadAssetsAsync();
    }
    async _loadAssetsAsync() {

        const fontAssets = cacheFonts([
            SimpleLineIcons.font,
        ]);

        await Promise.all([
            ...fontAssets,
        ]);

        this.setState({appIsReady: true});
    }
    enterHandle = (str) => {
        const {navigate} = this.props.navigation;
        navigate(str);
    };
    LoginClickHandle = () => {
        if(UserInfo.user == null){
            this.enterHandle('Login');
        }else{

        }
    };
    render() {
        if(!this.state.appIsReady){
            return (
                <Expo.AppLoading />
            )
        }else{
            return (
                <View style={styles.back}>
                    <LoginComponent onPress={this.LoginClickHandle} name={UserInfo.user && UserInfo.user.name}/>
                    <View>
                        <PersonBtn
                            iconName="bubble"
                            title={'消息中心'} badge={1}  onPress={this.enterHandle.bind(null,'Message')}/>
                        <Sep/>
                        <PersonBtn
                            onPress={this.enterHandle.bind(null,'Following')}
                            iconName="user-following"
                            title={'我的关注'} />
                        <PersonBtn
                            iconName="star"
                            title={'我的收藏'} onPress={this.enterHandle.bind(null,'Collection')}/>
                        <Sep/>
                        <PersonBtn
                            iconName="settings"
                            title={'设置'} />
                    </View>
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    back:{
        backgroundColor: 'rgb(247,247,247)',
        flexDirection: 'column',
        flex:1
    },
    content:{
        backgroundColor: 'white',
        height: 200
    }
});

