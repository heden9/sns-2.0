export function get(url) {
    const result = fetch(url, {
        method: 'get',
        credentials: 'include',
        mode: "cors",
        headers: {
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Accept': 'application/json, text/plain, */*'
        }
    });
    return result;
}