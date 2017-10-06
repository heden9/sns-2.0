import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import { getTranslate } from '../../../fetch/Translate/translate';
import InputArea from '../../../components/InputArea';
import Sep from '../../../components/Separated';
import UserInfo from '../../../mobx/store';
import { observer } from 'mobx-react';
import TranHeader from '../../../components/TranslateHeader';
import WordItem from '../../../components/WordItem';
import ImageWithTitle from '../../../components/ImageWithTitle';
import LoadingIcon from '../../../static/icon/loading.gif';
import EmptyStatus from '../../../components/emptyStatus';
import Comment from '../comment';
@observer
export default class TranslationPage extends React.Component{
    state = {
        areaValue: '',
        isRefresh: false,
        result: ''
    };
    static currentSubmit = '';
    changeHandle = (text) => {
        this.setState({
            areaValue: text
        });
    };
    submitHandle = () => {
        if(!this.state.areaValue)
            return;
        if(TranslationPage.currentSubmit === this.state.areaValue)
            return;
        this.setState({
            isRefresh: true
        });
        TranslationPage.currentSubmit = this.state.areaValue;
        const result = getTranslate(this.state.areaValue,'');
        result
            .then((res)=>res.json())
            .then((json)=>{
                const data = json;
                this.setState({
                    result: data,
                    isRefresh: false
                });
            })
            .catch((err)=>{
                alert(err);
            });
    };
    singHandle = () => {
        const {navigate} = this.props.navigation;
        navigate('Voice');
    };
    collectHandle = () => {
        const obj = this.state.result;
        const flag = !UserInfo.localMyCollect.get(this.state.result.query);
        UserInfo.changeCollect(obj,flag);
    };
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isRefresh ?
                        <View style={styles.loading_icon}>
                            <ImageWithTitle
                                title="加载中..."
                                source={LoadingIcon}/>
                        </View>
                        : null
                }
                <TranHeader />
                <InputArea
                    areaValue={this.state.areaValue}
                    submitHandle={this.submitHandle}
                    clearHandle={()=>this.setState({areaValue: '' })}
                    singHandle={this.singHandle}
                    changeHandle={this.changeHandle}/>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    bounces={true}>
                    <Sep height={2}/>
                    {
                        this.state.result ?
                            <View>
                                <Sep height={30} title={'翻译结果'}/>
                                <WordItem  result={this.state.result}
                                   collectHandle={this.collectHandle}
                                   isCollected={!!UserInfo.localMyCollect.get(this.state.result.query)}/>
                                <Comment/>
                            </View>:<EmptyStatus title={'请输入翻译内容哦:)'}/>
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgb(247,247,247)',
    },
    scrollView: {
        alignItems: 'center'
    },
    loading_icon: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
