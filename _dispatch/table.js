import { SET_TABLE_SORT, SET_TABLE_DATA, SET_TABLE_SESSION_RESULT } from './constant'

export const set_table_sort = (index, value) => {
    return dispatch => dispatch({
        type: SET_TABLE_SORT,
        index: `table_${index}`,
        value: value
    })
}

export const set_table_data = (trades) => {
  
    return dispatch => dispatch({
        type: SET_TABLE_DATA,
        trades: trades,
    })
}

export const set_table_session_result = (data) => {
    return dispatch => dispatch({
        type: SET_TABLE_SESSION_RESULT,
        data: data,
    })
}