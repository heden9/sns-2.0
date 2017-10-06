import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import Expo from 'expo';
import Sep from '../../components/Separated';
import CollectionBtn from '../Collection';
import ImgBtn from '../../components/ImgBtn';

export default class WordItem extends React.PureComponent{
    static defaultProps = {
        needImage: false
    };
    render(){
        const result = this.props.result;
        return (
            <View style={[styles.container,{width: WindowInfo.width}]}>
                <View style={{flexDirection: 'column'}}>
                    <View style={styles.area}>
                        <Text style={styles.title}>{result.query}</Text>
                         <CollectionBtn
                            needImage={this.props.needImage}
                            key={result.query}
                            isCollected={this.props.isCollected}
                            onPress={this.props.collectHandle.bind(null,result)}/>
                    </View>
                    <Sep height={6}/>
                    {
                        result.basic && result.basic.explains.map((item, index)=>{
                            return <ExplainItem key={index} data={item}/>
                        })
                    }
                    <Sep height={10}/>
                    <View style={styles.voiceBar}>
                        <VoiceBtn query={result.query}/>
                        {
                            result.basic &&
                            <View style={styles.voiceBar}>
                                <Text style={{marginLeft: 10}}>{result.basic['uk-phonetic'] ? `英[${result.basic['uk-phonetic']}]` : ''}</Text>
                                <Text style={{marginLeft: 10}}>{result.basic['us-phonetic'] ? `美[${result.basic['us-phonetic']}]` : ''}</Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        );
    }

}
const voice_container = 20;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        minHeight: 100,
        borderWidth: 1,
        borderColor: '#ededed',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 20,
    },
    area: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative'
    },
    voiceBar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    voiceContainer: {
        width: voice_container,
        height: voice_container,
        position: 'relative',
    },
    lottie: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: 250,
        height: 200
    },
    img: {
        width: 25,
        height: 25
    }

});

const ExplainItem = (props) => {
    return (
        <View>
            <Sep height={6}/>
            <Text>{props.data}</Text>
        </View>
    )
};

class VoiceBtn extends React.Component {
    constructor(){
        super(...arguments);
        this.sing = this.sing.bind(this);
        this.state = {
            active: false
        }
    }
    async sing () {
        const flag = await (Expo.Speech.isSpeakingAsync());
        if(flag)
            return;
        Expo.Speech.speak(this.props.query, {
            onStart: () => {
                this.setState({
                    active: true
                })
            },
            onError: () => {
                alert('您的设备不支持此功能');
            },
            onDone: () => {
                this.setState({
                    active: false
                })
            },
            onStopped: () => {
                this.setState({
                    active: false
                })
            }
        });
    }
    render() {
        return (
            <ImgBtn
                onPress={this.sing}
                active={this.state.active}
                url2={require('../../static/img/sound.png')}
                url={require('../../static/img/sound_o.png')}/>
        );
    }

}

