const { default: axiosClient } = require("./axiosClient")
const userApi = {}

userApi.signUp = async (params) => {
    const url = '/api/signup'
    return await axiosClient.post(url,params)
}
userApi.signIn = async (params) => {
    const url= `/api/signin`
    return await axiosClient.post(url,params)
}
userApi.signInAfterReload = async()=>{
    const url= `/api/me`
    return await axiosClient.post(url)
}
export default userApi