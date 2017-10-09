import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Alert,
    SectionList,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import UserInfo from '../../../mobx/store';
import ChatManager from '../../../mobx/chat';
const chatBarHeight = 80;
const headImg = 40;
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecedf1'
    },
    chatRoom: {
        flex: 1,
    },
    chatBar: {
        height: chatBarHeight,
        paddingHorizontal: 10,
        borderBottomColor: '#a9b3bd',
        borderBottomWidth: 1,
    },
    chatInput: {
        height: 35,
        paddingHorizontal: 3,
        borderRadius: 4,
        backgroundColor: 'white'
    },
    chatIconBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    Icon: {
        marginHorizontal: 5,
    },
    chat_container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    reverse: {
        flexDirection: 'row-reverse',
    },
    chat_img: {
        width: headImg,
        height: headImg,
        borderRadius: headImg/2,
    },
    chat_content: {
        padding: 8,
        backgroundColor: '#12b8f6',
        borderRadius: 10,
        marginHorizontal: 15,
    },
    white_content: {
        backgroundColor: 'white'
    },
    chat_text: {
        color: 'white',
    },
    black_text: {
        color: 'black'
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        textAlign: 'center',
        color: '#8e8d92',
        fontSize: 11,
    }
});
@observer
export default class Chat extends React.Component {
    componentWillMount(){
        ChatManager.fetchChatUserInfo(this.props.navigation.state.params.aimUser.userID);
    }
    render(){
        const { aimUser } = this.props.navigation.state.params;
        const chatHistory = ChatManager.chatHistory.peek();
        console.log(chatHistory);
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={55}>
                    <ScrollView style={[styles.chatRoom,{ width }]}>
                        {
                            chatHistory.map(p1 => {
                                return (
                                    <View key={p1.title} style={styles.section}>
                                        <Text style={styles.sectionTitle}>{p1.title}</Text>
                                        {
                                           p1.data.map(p2 => (
                                               <ChatItem { ...aimUser} {...p2} key={'p2'+p2.id}/>
                                           ))
                                        }
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={styles.chatBar}>
                        <TextInput style={styles.chatInput}/>
                        <ChatBar/>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

class ChatBar extends React.PureComponent {
    state = {
        microphone: false,
        photo: false,
        camera: false,
        at: false,
        phone: false,
        star_o: false,
        smile_o: false,
        plus_circle: false,
    };
    _selectedHandle = (name) => {
        name = name.replace(/-/i,'_');
        let temp = {};
        for(let key in this.state){
            temp[key] = false;
        }
        temp[name] = !this.state[name];
        this.setState({
            ...temp
        })
    };
    render(){
        const { microphone,photo,camera,at,phone,star_o,smile_o,plus_circle} = this.state;
        return (
            <View style={styles.chatIconBar}>
                <IconBtn name={"microphone"} selected={microphone} onPress={this._selectedHandle}/>
                <IconBtn name={"photo"} selected={photo} onPress={this._selectedHandle}/>
                <IconBtn name={"camera"} selected={camera} onPress={this._selectedHandle}/>
                <IconBtn name={"at"} selected={at} onPress={this._selectedHandle}/>
                <IconBtn name={"phone"} selected={phone} onPress={this._selectedHandle}/>
                <IconBtn name={"star-o"} selected={star_o} onPress={this._selectedHandle}/>
                <IconBtn name={"smile-o"} selected={smile_o} onPress={this._selectedHandle}/>
                <IconBtn name={"plus-circle"} selected={plus_circle} onPress={this._selectedHandle}/>
            </View>
        )
    }
}
class IconBtn extends React.PureComponent{
    state = {
       selected: false,
    };
    _selectedHandle = () => {
        this.props.onPress(this.props.name);
    };
    render(){
        const { name, style, selected } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this._selectedHandle}>
                <FontAwesome name={name} color={selected ? '#12b8f6' : '#808394'} size={23} style={[styles.Icon,style]}/>
            </TouchableWithoutFeedback>
        )
    }
}

@observer
class ChatItem extends React.Component{
    render(){
        const { headImgUrl, content, from_id} = this.props;
        const my = from_id === UserInfo.user.id;
        const newHeadImg = my ? UserInfo.user.headPortrait : headImgUrl;
        return (
            <View style={[styles.chat_container,my ? styles.reverse : null]}>
                <Image style={styles.chat_img} source={newHeadImg}/>
                <View style={[styles.chat_content, my ? null : styles.white_content]}>
                    <Text style={[styles.chat_text, my ? null : styles.black_text]}>{content}</Text>
                </View>
            </View>
        )
    }
}