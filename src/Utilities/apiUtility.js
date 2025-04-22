async function apiRequest(method, url, options = {}) {
    const { params = {}, body = {}, headers = {}, timeout = 5000 } = options;

    // Construct query string for GET request
    if (method.toUpperCase() === 'GET' && Object.keys(params).length > 0) {
        const queryString = new URLSearchParams(params).toString();
        url = `${url}?${queryString}`;
    }

    // Set up the fetch options
    const fetchOptions = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };

    // Add body for POST request
    if (['POST', 'PUT'].includes(method.toUpperCase())) {
        fetchOptions.body = JSON.stringify(body);
    }

    // Handle timeout
    const controller = new AbortController();
    //const timeoutId = setTimeout(() => controller.abort(), timeout);
    fetchOptions.signal = controller.signal;

    try {
        //console.log("in apiUtility 00")
        const response = await fetch(url, fetchOptions);
        //clearTimeout(timeoutId);
        //console.log("in apiUtility 01")
        if (!response.ok) {
            //console.log("in apiUtility 1.1")
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.text();
        //console.log("in apiUtility 2")
        try {
            //console.log("in apiUtility 3")
            //console.log(responseData)
            return JSON.parse(responseData);  // Assuming API returns JSON
            
        } catch (e) {
            //console.log("in apiUtility 4")
            return responseData;  // Fallback for non-JSON responses
        }

    } catch (error) {
        console.error('Error in API request:', error);
        return { error: error.message };
    }
}

export default apiRequest;
