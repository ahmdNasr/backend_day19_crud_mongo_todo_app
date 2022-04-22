console.log(process.env)
// BACKEND_URL muss mit REACT_APP_BACKEND_URL
export const apiBaseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:9000"
