const { default: axiosClient } = require("./axiosClient");
const countryApi = {};

countryApi.getAll = async (params) => {
  const url = "/api/country/getCountry";
  return await axiosClient.get(url, { params });
};

export default countryApi;
