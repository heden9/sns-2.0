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
    TouchableWithoutFeedback
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const chatBarHeight = 80;
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
    }
});
export default class Chat extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior="position"
                    keyboardVerticalOffset={55}>
                    <ScrollView style={[styles.chatRoom,{ width }]}>
                        <Text>chatRoom</Text>
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
    render(){
        return (
            <View style={styles.chatIconBar}>
                <IconBtn name={"microphone"}/>
                <IconBtn name={"photo"}/>
                <IconBtn name={"camera"}/>
                <IconBtn name={"at"}/>
                <IconBtn name={"phone"}/>
                <IconBtn name={"star-o"}/>
                <IconBtn name={"smile-o"}/>
                <IconBtn name={"plus-circle"}/>
            </View>
        )
    }
}
function IconBtn({ name, style }) {
    return (
        <TouchableWithoutFeedback onPress={()=>{Alert.alert('123')}}>
            <FontAwesome name={name} color={'#808394'} size={23} style={[styles.Icon,style]}/>
        </TouchableWithoutFeedback>
    )
}