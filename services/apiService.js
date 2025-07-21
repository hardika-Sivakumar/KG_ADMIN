const fetchWithTimeout = async (url, options, timeout = 20000, maxRetries = 3) => {
    let attempt = 0;
    console.log(url)

    while (attempt < maxRetries) {
        try {
            const response = await Promise.race([
                fetch(url, options),
                new Promise((_, reject) =>
                    setTimeout(
                        () =>
                            reject({
                                isTimeout: true,
                                success: false,
                                message: 'Request timeout',
                                status_code: 408,
                            }),
                        timeout
                    )
                ),
            ]);

            // If fetch succeeds, return the response as-is
            return response;

        } catch (error) {
            // Only retry on timeout
            if (error?.isTimeout && attempt < maxRetries - 1) {
                console.warn(`Timeout attempt ${attempt + 1}, retrying...`);
                attempt++;
                continue;
            }

            // Handle all other errors or if final retry failed
            console.error("Fetch error:", error);
            return {
                json: async () => ({
                    success: false,
                    message: error?.message || 'API error, please try again later!',
                    status_code: error?.status_code || 500,
                }),
            };
        }
    }
};

module.exports = { fetchWithTimeout };