function Network(endPoint, { body, ...customConfig } = {}) {
    const headers = {
        "Content-Type": "application/json;charset=utf-8",
    };

    const url = `${endPoint}`;

    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    };

    console.log(`Sending ${config.method} to ${url} with data:`, body);

    return fetch("http://localhost:3000" + url, config)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error(`${response.status} : '${response.statusText}'`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log(`Got JSON response ${response.status}`, data);
                return data;
            } else {
                const data = await response.text();
                console.log(`Got non-JSON response ${response.status}`, data);
                return data;
            }
        })
        .catch((error) => {
            console.error("Error in Network request:", error);
            throw error;
        });
}

Network.get = (endPoint, config) => Network(endPoint, { method: "GET", ...config });
Network.post = (endPoint, body, config) => Network(endPoint, { method: "POST", body, ...config });
Network.put = (endPoint, body, config) => Network(endPoint, { method: "PUT", body, ...config });
Network.delete = (endPoint, config) => Network(endPoint, { method: "DELETE", ...config });

export default Network;
