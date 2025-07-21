const { CONFIG } = require("../config");
const { fetchWithTimeout } = require("./apiService");

const getStaffDetails = async (headers, data) => {
    const response = await fetchWithTimeout(`${CONFIG.BACKEND_URL}/staff/get_staff_list`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
    return await response.json()
}

module.exports = {
    getStaffDetails
}