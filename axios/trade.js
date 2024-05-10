import axios from "./axios"

export const set_user_trade_start = async (data) => {
    return await axios.post("set_user_trade_start", {data: data})
}

export const set_user_bot_status_set = async (uuid) => {
    return await axios.post("set_user_bot_status_set", {uuid: uuid})
}


export const get_active_demo = async () => {
    return await axios.get("get_active_demo")
}

