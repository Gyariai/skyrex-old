import axios from "./axios"

export async function getuserdata(key) {
   return await axios.post("getuserdata", { key })
}

export const create_account = async (data) => {
   return await axios.post("create_account", {data: data})
}

export const update_account = async (data) => {
   return await axios.post("update_account", {data: data})
}

export const delete_account = async (uuid) => {
   return await axios.post("delete_account", {uuid: uuid})
}

export const get_token_account = async (user_id) => {
   return await axios.post("get_token_account", {user_id: user_id})
}

export const get_default_formdata = async (email) => {
   return await axios.post("get_default_formdata", {email: email})
}

export const change_password = async (key, password, old) => {
   return await axios.post("change_password", {key: key, password: password, old: old})
}

export const check_api = async (email) => {
   return await axios.post("check_api_exp", {email: email})
}


export const session_result = async (email) => {
   return await axios.post("session_result", {
      email: email
   })
}

export const continue_traiding = async (email, wallet = "-------------" ) => {
   return await axios.post("continue_traiding", {
      email: email, wallet: wallet
   })
}

