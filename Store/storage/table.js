import { SET_TABLE_SORT, SET_TABLE_DATA, SET_TABLE_SESSION_RESULT } from '../../_dispatch/constant'

const initState = {
    table_enchange: {
        index: "percentage" , sort: "+"
    },
    table_close: {
        index: "created_at" , sort: "+"
    },
    table_active: {
        index: "created_at" , sort: "+"
    },
    row_closed: [
        {
            index: "pair", sortable: true, text: "Pair"
        },
        {
            index: "created_at", sortable: true, text: "Open date"
        },
        {
            index: "closed_at", sortable: true, text: "Close date"
        },
        {
            index: "bought_amount", text: "Amount"
        },
        {
            index: "bought_average_price", sortable: true, text: "Total"
        },
        {
            index: "bought_volume", text: "Buy price"
        },
        {
            index: "sold_average_price", text: "Sell price"
        },
        {
            index: "final_profit", sortable: true, text: "Return"
        }
    ],
    row_active: [
        {
            index: "pair", text: "Pair"
        },
        {
            index: "created_at", text: "Open date"
        },
        {
            index: "bought_amount", text: "Amount"
        },
        {
            index: "bought_average_price", text: "Total"
        },
        {
            index: "bought_volume", text: "Buy price"
        },
        {
            index: "final_profit", text: "Return"
        } 
    ],
    row_enchange: [
        {
            index: "symbol", sortable: true, text: "Token"
        },
        {
            index: "percentage", sortable: true, text: "Share"
        },
        {
            index: "btc_value", sortable: true, text: "BTC value"
        },
        {
            index: "price", sortable: true, text: "Price"
        },
        {
            index: "amount", sortable: true, text: "Amount"
        },
        {
            index: "usd_value", sortable: true, text: "Total"
        },
    ],
    row_transaction: [
        {
            index: "date", text: "Period"
        },
        {
            index: "transaction", text: "Transaction ID"
        },
        {
            index: "comm", text: "Amount, $"
        },
    ],

    trades: [],
    results: [],
}

export const table = ( state = initState, action ) => {
    switch (action.type) {
        case SET_TABLE_SESSION_RESULT :
         
            return {
                ...state,
                results: action.data
            }
        case SET_TABLE_SORT :
            const p = state[action.index]
        
            let pos = {...state[action.index]}
           
    
            if(p.index === action.value.index) {
                pos.sort = p.sort === "+" ? "-" : "+"
            } else {
                pos = {
                    index: action.value.index , sort: "-" 
                }
            }
            return {
                ...state,
                [action.index]: pos
            }
        case SET_TABLE_DATA :
            console.log(action.trades)
            return {
                ...state,
                trades: action.trades
            }
        default:
            return state
    }
}