import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import {set_form_traiding_amount } from "../../../../../_dispatch/user"
import { number_number, number_string } from '../../../../../Action/number'

export const Input = ({ min, max, disabled }) => {
    const dispatch = useDispatch()
    const { balanceform, account } = useSelector(state => state.userdata.user)
    const [ error, setError ] = useState(false)

    const check = (account === 0 || account === 4)

    const Change = (e) => {
        let value = number_number(e.target.value)
        if(isNaN(value) === false && check) {
            if(value < min) value = false
            if(value > max) value = false
 
            if(value) {
                dispatch(set_form_traiding_amount(number_number(e.target.value)))
                setError(false)
            } else {
                dispatch(set_form_traiding_amount(number_number(e.target.value)))
                setError(true)
            }
        }
    }

    return (
        <div className="dashboard-row-item-inner-input ">
            <div className="dashboard-row-item-inner-input-object">
                USDT
            </div>
            <input 
                type="text" 
                value={number_string(balanceform)}
                style={{ border: "1px solid rgba(58, 58, 60, 0.2)" }}
                onChange={Change}
                disabled={disabled}
            />
            {
                error ? <p className="dashboard-row-item-inner-input-war">Minimum: {number_string(min)} USDT Available: {number_string(max)} USDT</p> : null
            }
            
        </div>      
    )
}