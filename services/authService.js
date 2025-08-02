const { CONFIG } = require("../config");
const { fetchWithTimeout } = require("./apiService");



const validateCreds=async(payload={},headers={})=>{
    const res =await fetchWithTimeout(`${CONFIG.BACKEND_URL}/auth/check_login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    })
    return await res.json()

}

module.exports={
    validateCreds
}