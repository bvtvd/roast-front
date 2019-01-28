/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/1/25
 * time: 14:42
 */

var api_url = ""

switch(process.env.NODE_ENV){
    case 'development':
        api_url = "http://localhost:9000/v1/";
        break;
    case 'production':
        api_url = "";
        break;
}

export const CONFIG = {
    API_URL: api_url,
}