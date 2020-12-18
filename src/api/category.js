const { default: axiosClient } = require("./axiosClient");
const categoryApi = {};

categoryApi.getAll = async (params) => {
  const url = "/api/category/getcategory";
  return await axiosClient.get(url, { params });
};

export default categoryApi;
