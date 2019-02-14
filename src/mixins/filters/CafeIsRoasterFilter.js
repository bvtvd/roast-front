/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/2/14
 * time: 13:56
 */

export const CafeIsRoasterFilter = {
    methods: {
        processCafeIsRoasterFilter(cafe) {
            // 检查咖啡店是否是烘培店
            return cafe.roaster === 1 ? true : false;
        }
    }
}