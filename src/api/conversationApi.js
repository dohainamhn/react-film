const { default: axiosClient } = require("./axiosClient")
const conversationApi = {}

conversationApi.getMany = async (params) => {
    const url = `/api/conversation`
    return await axiosClient.get(url,{params})
}


export default conversationApi;