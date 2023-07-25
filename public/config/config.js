const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;

// Manually construct the full URL for the API endpoint
const apiUrl = `${protocol}//${hostname}:${port}/api`;

const config = { url: apiUrl };

export default config;
// module.exports = config;
