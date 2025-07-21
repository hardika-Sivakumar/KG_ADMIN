const { CONFIG } = require("../config");
const { fetchWithTimeout } = require("./apiService");


const getStudentDetails = async (headers = {}, payload = {}) => {

    const response = await fetchWithTimeout(`${CONFIG.BACKEND_URL}/students/get_student_list`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
    })
    return await response.json();
}
module.exports = { getStudentDetails }