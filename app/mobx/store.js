import { observable,action,computed } from 'mobx';
import {Alert} from 'react-native';
class Store {
    @observable localMyCollect = new Map();
    @observable TabHeight = 50;
    @observable user = null;
    @action login(data){
        this.user = data;
        STORAGE.save({
            key: 'USERINFO',
            data: this.user,
            expires: 100*24*7
        });
    }
    @computed get collectLen(){
        return this.localMyCollect.values().length;
    }
    @action changeCollect(data, state){
        if(!data)
            return;
        if(state === true){
            data.isCollected = true;
            this.localMyCollect.set(data.query, data);
        }else if(state === false){
            this.localMyCollect.delete(data.query);
        }else{
            console.warn('err state!');
            return;
        }
        this.saveCollect();
    }
    @action loadCollect(data){
        for(let key in data){
            this.localMyCollect.set(key, data[key]);
        }
    }
    @action saveUserInfo(info) {
        this.user = info;
    }
    loadLocalInfo(){
        STORAGE.load({
            key: 'USER'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            if(!ret)
                return;
            this.loadCollect(ret);
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            Alert.alert(err.message);
        });
        STORAGE.load({
            key: 'USERINFO'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            if(!ret)
                return;
            this.saveUserInfo(ret);
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            Alert.alert('登录过期');
        })
    }
    saveCollect(){
        STORAGE.save({
            key: 'USER',  // 注意:请不要在key中使用_下划线符号!
            data: this.localMyCollect,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
    }
}
const UserInfo = new Store();
export default UserInfo;