import { get } from '../get';
import { MD5 } from '../../config/md5';
export function getTranslate(text,of='en',ot='zh_CHS') {
    let info = {
        q: text.trim(),
        f: of,
        t: ot,
        appKey: '0a5589ef83214ce8',
        salt: 2,
        pwd: 'mRY1Au0wUkeRGfJChFDMZDlO3oMwxDTw',
    };
    let str = info.appKey + info.q  + info.salt + info.pwd;
    info.sign = MD5(str);
    info.text = encodeURIComponent(text.trim());
    const { q, f, t, appKey, salt, sign} = info;
    const result = get(`https://openapi.youdao.com/api?q=${q}&from=${f}&to=${t}&appKey=${appKey}&salt=${salt}&sign=${sign}`);
    return result;
}