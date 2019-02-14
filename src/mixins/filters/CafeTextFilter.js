/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/2/14
 * time: 13:41
 */

export const CafeTextFilter = {
    methods: {
        processCafeTextFilter(cafe, text) {
            // 筛选文本不为空时才处理
            if(text.length > 0){
                // 如果咖啡店名称, 位置, 地址或城市与筛选文本匹配, 则返回true, 否则返回 false
                let pattern = '[^,]*' + text.toLowerCase() + '[,$]*';
                if(cafe.name.toLowerCase().match(pattern) ||
                    cafe.location_name.toLowerCase().match(pattern) ||
                    cafe.address.toLowerCase().match(pattern) ||
                    cafe.city.toLowerCase().match(pattern)
                ){
                    return true;
                }
            }
            return false
        }
    }
}