import { SET_URL_PARAMS_LINKS, SET_DASHBOARD_MOBILE, SET_ACCOUNT_MOBILE, SET_SELECT_UTC, SET_MENU_THEME, SET_ACCOUNT_WEB, FIRST_LOAD, SET_CONNECT_GLOBAL } from "./constant"

export function set_url_params_links(index) {
    
    window.scrollTo({
        top: 0,
        left: 0,
    })
 
    return dispatch => {
        dispatch({
            type: SET_URL_PARAMS_LINKS,
            index: Number(index)
        })
    }
}

export const account_web = () => {
    return dispatch => {
        dispatch({
            type: SET_ACCOUNT_WEB,
        })
    }
}

export const dashboard_modile = () => {
    return dispatch => {
        dispatch({
            type: SET_DASHBOARD_MOBILE,
        })
    }
}

export const account_modile = () => {
    return dispatch => {
        dispatch({
            type: SET_ACCOUNT_MOBILE,
        })
    }
}

export const set_select = (value) => {
    return dispatch => {
        localStorage.setItem("select_menu_utc", JSON.stringify(value))
        dispatch({
            type: SET_SELECT_UTC,
            select_menu_utc: value
        })
    }
}


export const Set_theme = (value) => {
    localStorage.setItem("theme", value)

    return dispatch => {
        dispatch({
            type: SET_MENU_THEME,
            theme: value
        })
    }
}


export const first_load = () => {
    return dispatch => {
        dispatch({
            type: FIRST_LOAD,
        })
    }
}

export const set_connect_global = (value) => {
    return dispatch => {
        dispatch({
            type: SET_CONNECT_GLOBAL,
            value: value
        })
    }
}