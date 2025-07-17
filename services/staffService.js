const {CONFIG} = require("../config");


const getStaffDetails=async (headers,data)=>{
    const response=await fetch(`${CONFIG.BACKEND_URL}/staff/get_staff_list`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(data)
    })
    return await response.json()
}

module.exports={
    getStaffDetails
}