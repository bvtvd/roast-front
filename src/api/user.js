/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/2/19
 * time: 14:20
 */

export default {
    login(credentials){
        return axios.post('login', credentials);
    },
    getUser(){
        return axios.get('user');
    }
}