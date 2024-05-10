import axios, { host } from "./axios"
import Axios from "axios"
import fileDownload from 'js-file-download'

export const get_trade_user = async (email, date) => {
    return await axios.post("get_trade_user", {email: email, date: date})
}

export const gettabledemo_v2 = async (date, cell_all = false) => {
    return await axios.post("gettabledemo_v2", {date: date, cell_all: cell_all})
}



export const GetExel = async (row, cell) => {

    const url = await axios.post("generateexel", {row, cell})
    .then(res => res.url)
    .catch(() => false)

    if(url) {
        await Axios({
            url: `${host}${url}`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            fileDownload(response.data, 'traiding.xlsx')
            axios.post("delete", { url: url })
        });
    }

    return
}