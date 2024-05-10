import { SET_USER_DATA, SET_FORM_ENCHANGE, SET_USER_USER_ID, SET_DEFAULT_CANCEL, SET_CONFIRM_CALENDAR, SET_FORM_TRAIDING_AMOUNT, SET_FORM_ACCOUNT_STATUS, SET_FORM_BOT_STATUS, SET_UPDATE_BALANCE, SET_DEMO_BALANCE, UP_GRAPH_DATA } from "./constant"

export const set_user_data = (user) => {
    return dispatch => {
        dispatch({
            type: SET_USER_DATA,
            user: user
        })
    }
}

export const set_form_value = (label, value) => {
    return dispatch => {
        dispatch({
            type: SET_FORM_ENCHANGE,
            label: label, 
            value: value
        })
    }
}

export const set_user_user_id = (user_id) => {
    return dispatch => {
        dispatch({
            type: SET_USER_USER_ID,
            user_id: user_id,
        })
    }
}

export const set_default_cancel = (data) => {
    return dispatch => {
        dispatch({
            type: SET_DEFAULT_CANCEL,
            data: data,
        })
    }
}

export const set_confirm_calendar = (date) => {
    return dispatch => {
        dispatch({
            type: SET_CONFIRM_CALENDAR,
            date: date,
        })
    }
}

export const set_form_traiding_amount = (value) => {
    return dispatch => {
        dispatch({
            type: SET_FORM_TRAIDING_AMOUNT,
            value: value,
        })
    }
}

export const set_form_account_status = (account) => {
    return dispatch => {
        dispatch({
            type: SET_FORM_ACCOUNT_STATUS,
            account: account,
        })
    }
}

export const set_form_bot_status = (botStatus) => {
    return dispatch => {
        dispatch({
            type: SET_FORM_BOT_STATUS,
            botStatus: botStatus,
        })
    }
}

export const set_update_balane = () => {
    return dispatch => {
        dispatch({
            type: SET_UPDATE_BALANCE
        })
    }
}

export const set_damo_balance= (balance) => {
    return dispatch => {
        dispatch({
            type: SET_DEMO_BALANCE,
            balance: balance
        })
    }
}

export const up_graph_data = () => {
    return dispatch => {
        dispatch({
            type: UP_GRAPH_DATA,
        })
    }
}



