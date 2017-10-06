import React from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    StyleSheet,
    LayoutAnimation,
    TouchableWithoutFeedback
} from 'react-native';
import Sep from '../../../components/Separated';
import { TouchBtn }  from '../../../components/normalComponent';
import { Octicons } from '@expo/vector-icons';
const data = {
    forward: 2161,
    star: '2万',
    comment: 5102
};
const newComment = [
    {
        headImgUrl: require('../../../static/img/Drum.png'),
        userID: '2015214',
        userName: '我的名字叫孙悟空',
        comment: '就知道你会站出来',
        comment_num: 20,
        star: 2000,
        time: '9-11 13:03'
    },
    {
        headImgUrl: require('../../../static/img/Drum.png'),
        userID: '2015224',
        userName: '我的名字叫孙悟空',
        comment: '就知道你会站出来',
        comment_num: 20,
        star: 2000,
        time: '9-11 13:03'
    },
    {
        headImgUrl: require('../../../static/img/Drum.png'),
        userID: '2015234',
        userName: '我的名字叫孙悟空',
        comment: '就知道你会站出来',
        comment_num: 20,
        star: 2000,
        time: '9-11 13:03'
    },
    {
        headImgUrl: require('../../../static/img/Drum.png'),
        userID: '2015244',
        userName: '我的名字叫孙悟空',
        comment: '就知道你会站出来',
        comment_num: 20,
        star: 2000,
        time: '9-11 13:03'
    }
];
const newForward = [
    {
        headImgUrl: require('../../../static/img/Drum.png'),
        userID: '2015214',
        userName: '孙悟空',
        comment: '就知道你会站出来',
        comment_num: 20,
        star: 2000,
        time: '9-11 13:03'
    },
    {
        headImgUrl: require('../../../static/img/Drum.png'),
        userID: '2015224',
        userName: '孙悟空',
        comment: '就知道你会站出来',
        comment_num: 20,
        star: 2000,
        time: '9-11 13:03'
    },
    {
        headImgUrl: require('../../../static/img/Drum.png'),
        userID: '2015234',
        userName: '孙悟空',
        comment: '就知道你会站出来',
        comment_num: 20,
        star: 2000,
        time: '9-11 13:03'
    },
    {
        headImgUrl: require('../../../static/img/Drum.png'),
        userID: '2015244',
        userName: '孙悟空',
        comment: '就知道你会站出来',
        comment_num: 20,
        star: 2000,
        time: '9-11 13:03'
    }
];
export default class Comment extends React.PureComponent {
    state = {
        commentData: newComment,
        forwardData: newForward,
        activeTab: 2
    };
    selectTab = (activeTab) => {
        LayoutAnimation.spring();
        this.setState({
            activeTab
        })
    };
    render(){
        return(
            <View>
                <Sep height={8}/>
                <TabBar
                    {...data}
                    selectTab={this.selectTab}
                    activeTab={this.state.activeTab}/>
                <Sep height={20}/>
                {
                    this.state.activeTab === 2 ?
                        <FlatList
                            style={styles.flat}
                            data={this.state.commentData}
                            ItemSeparatorComponent={()=><View style={styles.sepLine}/>}
                            keyExtractor={item => item.userID}
                            renderItem={({item, index}) => (
                                <Item {...item}/>
                            )}
                        />:
                        <FlatList
                            style={styles.flat}
                            data={this.state.forwardData}
                            ItemSeparatorComponent={()=><View style={styles.sepLine}/>}
                            keyExtractor={item => item.userID}
                            renderItem={({item, index}) => (
                                <Item {...item}/>
                            )}
                        />
                }
            </View>
        )
    }
}


function Item({headImgUrl, userID, userName, comment, comment_num, star, time}) {
    return (
        <View style={styles.item}>
            <Image style={styles.item_img} source={headImgUrl}/>
            <View style={{flex: 1}}>
                <Sep height={10}/>
                <Text style={styles.item_name}>{userName}</Text>
                <Sep height={8}/>
                <Text>{comment}</Text>
                <Sep height={8}/>
                <View style={styles.linkView}>
                    <Text style={styles.linkText}>共{comment_num}条回复 ></Text>
                </View>
                <Sep height={8}/>
                <View style={styles.bottomBar}>
                    <Text style={styles.small}>{time}</Text>
                    <View>
                        <Text style={styles.small}>
                            <Octicons name={"thumbsup"} size={15}/>
                            {' '+star}
                        </Text>
                    </View>
                </View>
                <Sep height={8}/>
            </View>
        </View>
    )
}


const text_width = 76;
const margin = 15;
const line_width = 40;
const calLeft = (n) => {
    if(n === 1){
        return margin + text_width/2 - line_width/2;
    }else if(n === 2){
        return text_width + margin * 2 + text_width/2 - line_width/2;
    }
};
const headImgR = 60;
const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: 'white',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f2f2f2',
    },
    toolbar_text: {
        color: '#848484',
        width: text_width,
        textAlign: 'center',
        fontSize: 15,
        paddingTop: margin,
        marginLeft: margin,
        marginBottom: margin
    },
    star_view: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    active: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#2c2c2c'
    },
    star: {

    },
    line: {
        position: 'absolute',
        bottom: 3,
        height: 4,
        width: line_width,
        borderRadius: 40,
        backgroundColor: '#fb8831'
    },
    flat: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ededed',
    },
    item: {
        flexDirection: 'row',
        paddingRight: 10,
    },
    item_img: {
        width: headImgR,
        height: headImgR,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: headImgR/2
    },
    item_name: {
        color: '#ff4500'
    },
    linkView: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#f2f2f2'
    },
    linkText: {
        fontSize: 15,
        color: '#537ead'
    },
    sepLine: {
        height: 1,
        width: '80%',
        transform: [{translateX: 90}],
        backgroundColor: '#f2f2f2',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    small: {
        color: '#9e9e9e',
        fontSize: 12,
    }
});
class TabBar extends React.PureComponent{
    render(){
        const {forward, comment, star, activeTab, selectTab} = this.props;
        return (
            <View style={styles.toolbar}>
                <TouchBtn
                    onPress={selectTab.bind(null,1)}
                    style={[styles.toolbar_text,activeTab === 1 && styles.active]}>
                    转发 {forward}
                </TouchBtn>
                <TouchBtn
                    onPress={selectTab.bind(null,2)}
                    style={[styles.toolbar_text,activeTab === 2 && styles.active]}>
                    评论 {comment}
                </TouchBtn>
                <View style={styles.star_view}>
                    <Text style={styles.toolbar_text}>赞 {star}</Text>
                </View>
                <View style={[styles.line,{left: calLeft(activeTab)}]}/>
            </View>
        )
    }

}
function numFormat() {
    return 1;
}
