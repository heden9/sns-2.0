import { post } from '../post';
import { HOST } from '../config';

export function login(data) {
    if(data == null)
        return;
    const result = post(HOST+'/checkLogin', data);
    return result;
}