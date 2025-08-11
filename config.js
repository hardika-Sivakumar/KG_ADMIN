require('dotenv').config();


const CONFIG = {
    PORT: process.env.PORT || 3000,
    BACKEND_URL: process.env.BACKEND_URL
}

module.exports = { CONFIG };