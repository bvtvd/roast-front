/**
 * author: Hans
 * email: hans01@foxmail.com
 * date: 2019/1/28
 * time: 11:15
 */

export default {
    /**
     * GET /v1/cafes
     * @returns {*}
     */
    getCafes: () => {
        return axios.get('cafes')
    },
    /**
     * GET /v1/cafes/{cafeId}
     * @param id
     * @returns {*}
     */
    getCafe: (id) => {
        return axios.get('cafes/' + id);
    },
    /**
     * POST /v1/cafes
     * @param name
     * @param address
     * @param city
     * @param state
     * @param zip
     * @returns {*}
     */
    postAddNewCafe: (name, locations, website, description, roaster) => {
        return axios.post("cafes", {
            name: name,
            locations: locations,
            website: website,
            description: description,
            roaster: roaster
        })
    }
}

