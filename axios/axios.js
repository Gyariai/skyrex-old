import axios from "axios";

export const host = "https://srxpanel.space/" // "http://localhost:3000/" "https://srxpanel.space/"

const urlSearchParams = new URLSearchParams(window.location.search);
const { token } = Object.fromEntries(urlSearchParams.entries());


const axiosInstance = axios.create({
    timeout: 300000,
    baseURL: host + "api/"
})

axiosInstance.interceptors.request.use((conf) => {
    conf.headers = {
        "Authorization": `Bearer ${token}`
    }

    return conf
},
    () => {
        return false
    }
)

axiosInstance.interceptors.response.use(
    response => response.data,
    (err) => {
        if(err?.response?.status === 403) {
            localStorage.setItem("token_fa", "")
            window.location.reload()
        }
        return false
    }
);


export default axiosInstance;