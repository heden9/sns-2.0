import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    InteractionManager,
    Animated
} from 'react-native';
import WordItem from '../../../components/WordItem';
import Sep from '../../../components/Separated';
import LoadingIcon from '../../../static/icon/loading.gif';
import ImageWithTitle from '../../../components/ImageWithTitle';
import Footer from '../../../components/renderFooter';
import UserInfo from '../../../mobx/store';
import EmptyStatus from '../../../components/emptyStatus';
import { observer } from 'mobx-react';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
@observer
export default class Collection extends React.Component{
    state = {
        isLoading: false
    };
    collectHandle = (data) => {
        UserInfo.changeCollect(data,!data.isCollected);
    };
    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                isLoading: false
            })
        });
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    !this.state.isLoading && UserInfo.collectLen === 0 ?
                        <EmptyStatus title={'您暂无收藏哦TnT'}/>
                        :null
                }
                <Sep height={5}/>
                {
                    this.state.isLoading ?
                        <ImageWithTitle
                            title="加载中..."
                            source={LoadingIcon}/>:
                        <View>
                            {
                                UserInfo.collectLen !== 0 &&
                                <AnimatedFlatList
                                    data={UserInfo.localMyCollect.values().reverse()}
                                    ItemSeparatorComponent={()=><Sep height={5}/>}
                                    extraData={this.state}
                                    ListHeaderComponent={()=><Header num={UserInfo.collectLen}/>}
                                    ListFooterComponent={<Footer/>}
                                    keyExtractor={(item, index) => item.query}
                                    renderItem={({item,index}) =>
                                        <WordItem
                                            needImage={true}
                                            result={item}
                                            isCollected={item.isCollected}
                                            collectHandle={this.collectHandle}/>
                                    }
                                />
                            }
                        </View>
                }
            </View>
        );
    }
}

function Header({num}) {
    return (
        <View>
            <Text style={styles.header_title}>您收藏了{num}个单词</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container_inner: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    image: {
        width: 250,
        height: 150
    },
    inner_title: {
        marginTop: 15,
        fontSize: 18,
        color: "#9e9e9e"
    },
    header_title: {
        margin: 10,
        color: '#848484'
    }
});
