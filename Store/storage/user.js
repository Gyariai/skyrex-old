import { SET_USER_DATA, SET_FORM_ENCHANGE, SET_USER_USER_ID, SET_DEFAULT_CANCEL, SET_CONFIRM_CALENDAR, SET_FORM_TRAIDING_AMOUNT, SET_FORM_ACCOUNT_STATUS, SET_FORM_BOT_STATUS, SET_UPDATE_BALANCE, SET_DEMO_BALANCE } from "../../_dispatch/constant"
import { sortBalance, splitBalance } from "../../Action/balance"

const initState = {
    user: {
        email: "demo@gmail.com",
        balanceform: 0,
        uuid: "",
        name: "",
        exchange: "Binance",
        apikey: "",
        secretapikey: "",
        passphrase: "",
        subaccount_name: "",
        active: 0,
        account: 0,
        status: 0,
        bot1_id: "",
        user_id: "demo",
        two_auth: "",
        persent: 0,
        high_watermark: 0,
    },
    balance: [{
        startdate: "2000-01",
    }],
    currBalance: {
        year: 2000,
        month: 0,
    },
    usdtBalance: 0,
    botStatus: false
}

export const userdata = ( state = initState, action ) => {
    const copy_form_enchange = {...state.user}

    switch (action.type) {
        case SET_USER_DATA :
            const b = sortBalance(action.user.balance)
            return {
                ...state,
                user: action.user.data,
                balance: b,
                currBalance: splitBalance(b[b.length - 1]),
                usdtBalance: Number(Number(action.user.usdtBalance).toFixed()),
                botStatus: action.user.botStatus
            }
        case SET_DEMO_BALANCE :
            const demoBalance = sortBalance(action.balance)
            return {
                ...state,
                balance: demoBalance,
                currBalance: splitBalance(demoBalance[demoBalance.length - 1]),
                usdtBalance: demoBalance[demoBalance.length - 1].balance,
                botStatus: true
            }
        case SET_DEFAULT_CANCEL :
            copy_form_enchange.exchange = action.data.exchange
            copy_form_enchange.passphrase = action.data.passphrase
            copy_form_enchange.subaccount_name = action.data.subaccount_name
            copy_form_enchange.apikey = action.data.apikey
            copy_form_enchange.secretapikey = action.data.secretapikey

            return {
                ...state,
                user: copy_form_enchange,
            } 
        case SET_FORM_ENCHANGE :
            copy_form_enchange[action.label] = action.value

            return {
                ...state,
                user: copy_form_enchange
            }
        case SET_UPDATE_BALANCE :
            const balance = [ ...sortBalance(state.balance) ]
            balance[balance.length - 1].balance = state.user.balanceform

            return {
                ...state,
                balance: balance,
                currBalance: splitBalance(balance[balance.length - 1]),
            } 

        case SET_FORM_ACCOUNT_STATUS :
            copy_form_enchange["account"] = action.account

            return {
                ...state,
                user: copy_form_enchange
            }
        case SET_FORM_BOT_STATUS :
            return {
                ...state,
                botStatus: action.botStatus
            }       
                
        case SET_USER_USER_ID :
            copy_form_enchange["user_id"] = action.user_id

            return {
                ...state,
                user: copy_form_enchange
            }
       case SET_CONFIRM_CALENDAR :
            return {
                ...state,
                currBalance: action.date
            }
        case SET_FORM_TRAIDING_AMOUNT :
            copy_form_enchange["balanceform"] = action.value
            return {
                ...state,
                user: copy_form_enchange
            }          
        default:
            return state
    }
}