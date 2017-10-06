import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    Dimensions,
    LayoutAnimation,
    UIManager
} from 'react-native';
import Expo from 'expo';
import TabNavigator from 'react-native-tab-navigator';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import TranslationPage from '../containers/TranslationPage/homepage';
import PersonPage from '../containers/PersonPage/home';
import Moments from '../containers/Moments';
import Storage from '../storage';
import UserInfo from '../mobx/store';
import { observer } from 'mobx-react';

function changeScreenOrientation() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);
}
@observer
export default class Router extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            selectedTab: 'PersonPage'
        };
    }
    componentWillMount(){
        changeScreenOrientation();
    }
    componentDidMount(){
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        UserInfo.loadLocalInfo();
    }
    selectHandle(PageName){
        const CustomAnimation = {
            duration: 400,
            update: {
                type: LayoutAnimation.Types.spring,
                property: LayoutAnimation.Properties.scaleXY,
                springDamping: .6
            }
        };
        LayoutAnimation.configureNext(CustomAnimation);
        this.setState({
            selectedTab: PageName
        });
    };
    render(){
        return(
            <TabNavigator
                tabBarStyle={[{ height: UserInfo.TabHeight},style.tabBarStyle]}
                sceneStyle={{ paddingBottom: UserInfo.TabHeight }}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'TranslationPage'}
                    title="翻译"
                    renderIcon={()=><FontAwesome name="address-book" size={21} color="grey" />}
                    renderSelectedIcon={() => <FontAwesome name="address-book-o" size={23} color='#42b5fb' />}
                    selectedTitleStyle={style.selectedTitleStyle}
                    onPress={() => this.selectHandle('TranslationPage')}>
                    { <TranslationPage {...this.props}/> }
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Moments'}
                    title="圈子"
                    renderIcon={()=><Ionicons name="ios-text-outline" size={24} color="grey" />}
                    renderSelectedIcon={() => <Ionicons name="ios-text" size={26} color='#42b5fb' />}
                    selectedTitleStyle={style.selectedTitleStyle}
                    onPress={() => this.selectHandle('Moments')}>
                    { <Moments/> }
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'PersonPage'}
                    title="我的"
                    renderIcon={()=><MaterialIcons name="person-outline" size={25} color="grey" />}
                    renderSelectedIcon={() => <MaterialIcons name="person" size={27} color='#42b5fb' />}
                    selectedTitleStyle={style.selectedTitleStyle}
                    onPress={() => this.selectHandle('PersonPage')}>
                    { <PersonPage {...this.props}/>}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const style = StyleSheet.create({
    tabBarStyle: {
        overflow: 'hidden' ,
        paddingBottom: 3,
        borderTopWidth:1,
        borderColor: '#eee'
    },
    selectedColor: {
        color: '#42b5fb',
    }
});
global.WindowInfo = { height, width } = Dimensions.get('window');
global.STORAGE = Storage;