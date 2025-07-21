const { CONFIG } = require("../config");
const { fetchWithTimeout } = require("./apiService");


const getEventDetails = async (headers, data) => {
    const response = await fetchWithTimeout(`${CONFIG.BACKEND_URL}/event/get_event_list`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
    return await response.json()
}

module.exports = {
    getEventDetails
}