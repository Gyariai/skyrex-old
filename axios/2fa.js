import axios from "./axios"

export  const qrcodesecret = async (email) => {
    return await axios.post("qrcodesecret", { email: email })
}
export const qrcodesecretauth = async (email, token, base) => {
    return await axios.post("qrcodesecretauth", { email: email, token: token, base: base })
    .then((res) => res)
    .catch(() => false)
}
export const tokenfadisable = async (email, token) => {
    return await axios.post("tokenfadisable", { email: email, token: token })
    .then((res) => res)
    .catch(() => false)
}
export const resetfatoken = async (email) => {
    return await axios.post("resetfatoken", { email: email })
    .then((res) => res)
    .catch(() => false)
}
export const resetfatokenstatus = async (email, token) => {
    return await axios.post("resetfatokenstatus", { email: email, token: token })
    .then((res) => res)
    .catch(() => false)
}
export const genereatetokenuser = async (email, token) => {
    return await axios.post("genereatetokenuser", { email: email, token: token })
    .then((res) => res)
    .catch(() => false)
}

export const checktokenfa = async (email, token_fa, token) => {
    return await axios.post("checktokenfa", { email: email, token_fa: token_fa, token: token })
    .then((res) => res)
    .catch(() => false)
}