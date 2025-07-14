require('dotenv').config();


const CONFIG={
    PORT:process.env.PORT || 3000,
}
console.log(CONFIG);

module.exports = { CONFIG };