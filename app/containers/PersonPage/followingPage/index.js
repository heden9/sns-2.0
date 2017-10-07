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
    Alert
} from 'react-native';
import Sep from '../../../components/Separated';
import Footer from '../../../components/renderFooter';
import {SimpleLineIcons} from '@expo/vector-icons';
const AnimatedFlat = Animated.createAnimatedComponent(FlatList);
import { getFollow } from '../../../fetch/fetchUserInfo';
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
                <Sep title={'我经常访问的人(仅自己可见)'} height={30}/>
                {
                    this.state.alwaysVisitData.map(item=>(
                        <Item
                            {...item}
                            key={item.userID}/>
                    ))
                }
                <Sep title={'全部关注'} height={30}/>
                {
                    this.state.allFollow.length !== 0 &&
                    <AnimatedFlat
                        style={styles.flat}
                        data={this.state.allFollow}
                        ItemSeparatorComponent={()=><View style={styles.sepLine}/>}
                        ListFooterComponent={<Footer/>}
                        keyExtractor={item => item.userID}
                        renderItem={({item, index}) => (
                            <Item {...item} key={item.userID}/>
                        )}
                    />
                }
            </ScrollView>
        )
    }
}
const headImgR = 50;
const grey = '#808080';
const deepGrey = '#636363';
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
        color: '#ff4500'
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
        fontSize: 11,
        color: deepGrey
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
    state = {
        isFollow: true
    };
    pressHandle = () => {
        this.setState({
            isFollow: !this.state.isFollow
        })
    };
    render() {
        const { userName, dynamics} = this.props;
        return (
            <View style={styles.item}>
                <Image source={headImgUrl} style={styles.item_img}/>
                <View style={styles.item_center}>
                    <Text style={styles.item_name}>{userName}</Text>
                    <Sep height={5}/>
                    <Text
                        numberOfLines={1}
                        style={styles.text}>{dynamics}</Text>
                </View>
                <View style={styles.item_left}>
                    <TouchableOpacity style={styles.touch} onPress={this.pressHandle}>
                        <SimpleLineIcons name={this.state.isFollow ? "user-following" : "user-follow"} size={18} color={deepGrey}/>
                        <Sep height={5}/>
                        <Text style={styles.dynamics}>{this.state.isFollow ? '已关注' : '关注'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}