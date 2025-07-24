const { CONFIG } = require("../config");
const { fetchWithTimeout } = require("./apiService");


const getSettingDetails=async (headers) => {
    const response = await fetchWithTimeout(`${CONFIG.BACKEND_URL}/setting/get_setting_details`, {
        method: "GET",
        headers: headers,
    })
    return await response.json()
}

module.exports = {
    getSettingDetails
}