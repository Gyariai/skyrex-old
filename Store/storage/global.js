import { urlSearchParams, themeDefault } from "../../Action/store/url"

import { SET_URL_PARAMS_LINKS, SET_ACCOUNT_WEB, SET_ACCOUNT_MOBILE, SET_DASHBOARD_MOBILE, SET_SELECT_UTC, SET_MENU_THEME, FIRST_LOAD, SET_CONNECT_GLOBAL } from "../../_dispatch/constant"

const utc =  localStorage.getItem("select_menu_utc")
const time = new Date().getTimezoneOffset() / 60

const initState = {
    url: urlSearchParams(),
    theme: themeDefault(),
    account_web: false,
    dashboard_mobile: false,
    account_mobile: false,
    select_menu_utc: utc ? JSON.parse(utc) : {
        value: time < 0 ? -time : +time,
        label: "UTC 0"
    },
    firstload: true,
    connectGlobal: true,
    connectDemo: true
}

export const global = ( state = initState, action ) => {
    switch (action.type) {
        case SET_URL_PARAMS_LINKS : {
            const url = {...state.url}
            url.index = action.index

            return {
                ...state,
                url: url
            }
        }
        case SET_ACCOUNT_WEB :
            return {
                ...state,
                account_web: !state.account_web,
            }
        case FIRST_LOAD :
            return {
                ...state,
                firstload: false
            }
        case SET_ACCOUNT_MOBILE :
            return {
                ...state,
                account_mobile: !state.account_mobile,
                dashboard_mobile: false
            }
        case SET_DASHBOARD_MOBILE :
            return {
                ...state,
                dashboard_mobile: !state.dashboard_mobile,
                account_mobile: false
            }
        case SET_SELECT_UTC :
            return {
                ...state,
                select_menu_utc: action.select_menu_utc
            }   
        case SET_MENU_THEME :
            return {
                ...state,
                theme: action.theme,
            } 

        case SET_CONNECT_GLOBAL :
            return {
                ...state,
                [action.value]: false,
            } 
        default:
            return state
    }
}