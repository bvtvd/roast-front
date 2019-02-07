/**
 * Created by Hans on 2019/2/7.
 */


export default {
    /**
     * 获取所有的冲泡方法
     */
    getBrewMethod(){
        return axios.get('brew-methods');
    },

}