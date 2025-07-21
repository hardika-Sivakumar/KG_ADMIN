const { CONFIG } = require("../config");
const { fetchWithTimeout } = require("./apiService");

const getGalleryDetails = async () => {
    const res = await fetchWithTimeout(`${CONFIG.BACKEND_URL}/gallery/get_gallery_details`);
    const data = await res.json();
    return data;
}

module.exports = { getGalleryDetails }