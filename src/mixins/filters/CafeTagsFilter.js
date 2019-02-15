/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/2/14
 * time: 13:49
 */

export const CafeTagsFilter = {
    methods: {
        processCafeTagsFilter(cafe, tags){
            // 如果标签为空则不处理
            if(tags.length > 0){
                let cafeTags = [];

                // 将咖啡店所有标签推送到 cafeTags 数组中
                if(cafe.tags && cafe.tags.length > 0){
                    for(let i = 0; i < cafe.tags.length; i++){
                        cafeTags.push(cafe.tags[i].name)
                    }

                    // 遍历所有待处理标签, 如果标签在 cafeTags 数组中返回 true
                    for(let i = 0; i < tags.length; i++){
                        if(cafeTags.indexOf(tags[i]) > -1){
                            return true;
                        }
                    }
                }

                return false;
            }

            return true;
        }
    }
}