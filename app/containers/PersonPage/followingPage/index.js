import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    RefreshControl,
    FlatList,
    Animated,
    TouchableOpacity,
    TouchableHighlight,
    Alert
} from 'react-native';
import Sep from '../../../components/Separated';
import Footer from '../../../components/renderFooter';
import {SimpleLineIcons} from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
const AnimatedFlat = Animated.createAnimatedComponent(FlatList);
import { getFollow, cancelFollow, addFollow } from '../../../fetch/fetchUserInfo';
export default class StarPage extends React.PureComponent{
    constructor(){
        super(...arguments);
        this.state = {
            alwaysVisitData: [],
            allFollow: [],
            refreshing: false,
        };
        this.getData = this.getData.bind(this);
    }
    _refreshHandle = () => {
        this.getData();
    };
    async getData () {
        try {
            this.setState({
                refreshing: true
            });
            const { data, code } = await getFollow();
            if(!data){
                this.setState({
                    refreshing: false
                });
                if(code === 2){
                    this.props.navigation.navigate('Login');
                }
                return;
            }
            const { alwaysVisitData, allFollow } = data;
            const toast = Toast.show('数据更新', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            this.setState({
                refreshing: false,
                alwaysVisitData: [...alwaysVisitData],
                allFollow: [...allFollow]
            })
        } catch (err) {
            Alert.alert('网络错误','',[{text: 'Ok', onPress: ()=>this.setState({
                refreshing: false
            })}],{ cancelable: false });
        }
    };
    componentDidMount(){
        this.getData();
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
                {
                    this.state.alwaysVisitData.length !== 0 &&
                    <Sep title={'我经常访问的人(仅自己可见)'} height={30}/>
                }
                {
                    this.state.alwaysVisitData.map(item=>(
                        <Item
                            {...item}
                            key={item.userID}/>
                    ))
                }
                <Sep title={'全部关注'} height={30}/>
                {
                    this.state.allFollow.length !== 0 ?
                    <AnimatedFlat
                        style={styles.flat}
                        data={this.state.allFollow}
                        ItemSeparatorComponent={()=><View style={styles.sepLine}/>}
                        ListFooterComponent={<Footer/>}
                        keyExtractor={item => item.userID}
                        renderItem={({item, index}) => (
                            <Item {...item} navigate={this.props.navigation.navigate} key={item.userID}/>
                        )}
                    />: <Sep title={'暂无关注'} height={30}/>
                }
            </ScrollView>
        )
    }
}
const headImgR = 50;
const grey = '#a0a0a0';
const deepGrey = '#636363';
const orange = '#ff4500';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',

    },
    item_img: {
        width: headImgR,
        height: headImgR,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: headImgR/2
    },
    sepLine: {
        height: 1,
        width: '100%'
    },
    item_center: {
        width: 200,
        justifyContent: 'center',
    },
    item_name: {
        color: orange,
        fontSize: 15
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
    text: {
        fontSize: 13,
        color: grey
    },
    dynamics: {
        width: 35,
        textAlign: 'center',
        fontSize: 11,
        color: deepGrey
    }
});

const headImgUrl = require('../../../static/img/s.jpg');
class Item extends React.Component {
    constructor(){
        super(...arguments);
        this._cancelFollow = this._cancelFollow.bind(this);
        this._addFollow = this._addFollow.bind(this);
    }
    state = {
        isFollow: true
    };
    static defaultProps = {
        headImgUrl: headImgUrl
    };
    async _cancelFollow(userID) {
        const { data } = await cancelFollow(userID);
        if(data){
            const toast = Toast.show(data, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            this.setState({
                isFollow: false
            })
        }
    }
    async _addFollow(userID) {
        const { data } = await addFollow(userID);
        if(data){
            const toast = Toast.show(data, {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            this.setState({
                isFollow: true
            })
        }
    }
    pressHandle = (userID) => {
        if(this.state.isFollow){
            this._cancelFollow({id: userID});
        }else {
            this._addFollow({id: userID});
        }
    };
    _enterChat = () => {
        this.props.navigate('Chat',{
            title: this.props.userName
        });
    };
    render() {
        const { userName, dynamics, userID, headImgUrl} = this.props;
        return (
            <TouchableHighlight onPress={this._enterChat}>
                <View style={styles.item}>
                    <Image source={headImgUrl} style={styles.item_img}/>
                    <View style={styles.item_center}>
                        <Text style={styles.item_name}>{userName}</Text>
                        <Sep height={7}/>
                        <Text
                            numberOfLines={1}
                            style={styles.text}>{dynamics}</Text>
                    </View>
                    <View style={styles.item_left}>
                        <TouchableOpacity style={styles.touch} onPress={this.pressHandle.bind(null, userID)}>
                            <SimpleLineIcons name={this.state.isFollow ? "user-following" : "user-follow"} size={18} color={this.state.isFollow ? deepGrey : orange}/>
                            <Sep height={5}/>
                            <Text style={[styles.dynamics,this.state.isFollow ? null : {color: orange}]}>{this.state.isFollow ? '已关注' : '加关注'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}