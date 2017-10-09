import { observable,action,computed } from 'mobx';
import { fetchChatHistory } from '../fetch/fetchUserInfo';
import UserInfo from './store';
class Chat {
    @observable chatHistory = [];


    @action async fetchChatUserInfo(to_id) {
        const { data } = await fetchChatHistory({id: to_id});
        this.chatHistory = data;
        this.saveChatHistory(data,to_id);
    }
    saveChatHistory(data,to_id){
        STORAGE.save({
            key: `USER${UserInfo.user.id}-${to_id}`,  // 注意:请不要在key中使用_下划线符号!
            data: data,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
    }
}
const chat = new Chat();
export default chat;