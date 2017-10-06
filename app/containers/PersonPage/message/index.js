import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    View,
    FlatList,
    Button,
    RefreshControl,
    Animated,
    TouchableHighlight
} from 'react-native';
import Sep from '../../../components/Separated';
import Footer from '../../../components/renderFooter';
import Badge from '../../../components/Badge';
import Swipeout from 'react-native-swipeout';
import {SimpleLineIcons} from '@expo/vector-icons';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import { getMessage } from '../../../fetch/fetchUserInfo';
const iconArr = {
    "@我的" : require('../../../static/img/message_03.png'),
    "评论" : require('../../../static/img/message_06.png'),
    "赞" : require('../../../static/img/message_08.png'),
    "未关注人消息" : require('../../../static/img/message_10.png'),
    "订阅消息" : require('../../../static/img/message_12.png')
};
export default class Demo extends React.Component {
    constructor(){
        super(arguments);
        this._getData = this._getData.bind(this);
    }
    state = {
        messageData: [],
        refreshing: false,
    };
    _refreshHandle = () => {
        this.setState({
            refreshing: true
        });
        setTimeout(()=>
            this.setState({
                refreshing: false
            }), 2000);
    };
    _onDelete = (userID) => {
        this.setState({
            messageData: this.state.messageData.filter(item=>{
                if(item.userID !== userID)
                    return item;
            })
        })
    };
    async _getData () {
        this.setState({
            refreshing: true,
        });
        const { data: { message, inform } } = await getMessage();
        const temp = inform.concat(message).map(item => {
            return {
                ...item,
                headImgUrl: iconArr[item.userName]
            }
        });
        this.setState({
            refreshing: false,
            messageData: temp
        })
    }
    componentDidMount() {
        this._getData();
    }
    render(){
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={this._refreshHandle}
                        refreshing={this.state.refreshing}/>
                }
                bounces={true}
                setContentStyle={styles.container}>
                <AnimatedFlatList
                    data={this.state.messageData}
                    ItemSeparatorComponent={()=><Sep height={1}/>}
                    ListFooterComponent={<Footer/>}
                    keyExtractor={item => item.userID}
                    renderItem={({item, index}) => (
                        <Item { ...item }
                            onDelete={this._onDelete}
                            left_icon={
                            item.currentTime ?  <Text style={styles.time}>{item.currentTime}</Text> :
                                <View>
                                    {
                                        item.badge === 0 ? <SimpleLineIcons name='arrow-right' size={15} color={'#ccc'}/>:
                                            <Badge num={item.badge}/>
                                    }
                                </View>
                        }/>
                    )}/>
            </ScrollView>
        )
    }
}

const headImgR = 50;
const grey = '#808080';
const deepGrey = '#636363';
const titleSize = 17;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    item_img: {
        width: headImgR,
        height: headImgR,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: headImgR/2
    },
    item_center: {
        width: 200,
        justifyContent: 'center',
    },
    item_name: {
        fontSize: titleSize,
        color: '#3b3b3b'
    },
    item_left: {
        flex: 1,
        marginRight: 20,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    touch: {
        alignItems: 'center'
    },
    time: {
        color: deepGrey,
        fontSize: 12
    },
    dynamics: {
        fontSize: 11,
        color: deepGrey
    },
    swipeBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    swipeBtn_text: {
        color: 'white',
        fontSize: titleSize
    }
});

function Item({headImgUrl, userName, dynamics, userID, left_icon, badge, onPress=()=>{alert('press')}, onDelete=()=>{alert('删除')} }) {
    const swipeoutBtns = [
        {
            component: <View style={styles.swipeBtn}><Text style={styles.swipeBtn_text}>删除</Text></View>,
            type: 'delete',
            onPress: onDelete.bind(null,userID)
        }
    ];
    return (
        <Swipeout autoClose={true} right={swipeoutBtns} disabled={badge != null}>
            <TouchableHighlight onPress={onPress}>
                <View style={styles.item}>
                    <Image source={headImgUrl} style={styles.item_img}/>
                    <View style={styles.item_center}>
                        <Text style={styles.item_name}>{userName}</Text>
                        <Sep height={5}/>
                        {
                            dynamics && <Text
                                numberOfLines={1}
                                style={styles.dynamics}>{dynamics}</Text>
                        }
                    </View>
                    <View style={styles.item_left}>
                        {left_icon}
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeout>
    )
}