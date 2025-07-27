const { CONFIG } = require("../config");
const { fetchWithTimeout } = require("./apiService");



const getContactDetails = async () => {
    const res = await fetchWithTimeout(`${CONFIG.BACKEND_URL}/contact/get_contact_request_details`);
    const data = await res.json();
    return data;
}

module.exports = {
    getContactDetails
}