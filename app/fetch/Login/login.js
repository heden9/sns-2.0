import { post } from '../post';
import { HOST } from '../config';

export function login(data) {
    const result = post(HOST+'/api/login', data);
    return result;
}