const {CONFIG} = require("../config");


const getEventDetails=async (headers,data)=>{
    const response=await fetch(`${CONFIG.BACKEND_URL}/event/get_event_list`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(data)
    })
    return await response.json()
}

module.exports={
    getEventDetails
}