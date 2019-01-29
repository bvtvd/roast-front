/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/1/25
 * time: 14:42
 */

var api_url = "";
var app_url = "";
var geode_maps_js_api_key = 'f6ba1a9d6a8b0f1095b2160a69d07639';

switch(process.env.NODE_ENV){
    case 'development':
        api_url = "http://localhost:9000/v1/";
        app_url = "http://localhost:9000/";
        break;
    case 'production':
        api_url = "";
        break;
}

export const CONFIG = {
    API_URL: api_url,
    APP_URL: app_url,
    GEODE_MAPS_JS_API_KEY: geode_maps_js_api_key,
}