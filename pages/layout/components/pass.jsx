import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FabeCont } from '../../../lib/fabe'

import { urlSearchParams } from '../../../Action/store/url'
import { isValid } from '../../../Action/valid'
import { change_password } from '../../../axios/user'

import { toast } from 'react-toastify'

export const PasswordPopup = ({ setStatus, status }) => {
    const [ input, set_input ] = useState({
        old: "",
        new: "",
        con: ""
    })

    const [ error, set_error ] = useState({
        old: false,
        new: false,
        con: false
    })

    const { key } = useSelector(state => state.global.url)

    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        const copu_input = {...input}

        copu_input[name] = value
        set_input(copu_input)
    }

    const Error_check = () => {
        const pass_valid = isValid(input.new)
        const new_con =  input.new === input.con

        const error_copy = {...error}
        if(!input.old) {
            error_copy.old = true
        } else {
            error_copy.old = false
        }
        if(pass_valid === false) {
            error_copy.new = true
        } else {
            error_copy.new = false
        }
        if(new_con === false) {
            error_copy.con = true
        } else {
            error_copy.con = false
        }
        set_error(error_copy)
    }

    const Submit = async () => {
        Error_check()

        const pass_valid = isValid(input.new)
        const new_con =  input.new === input.con
      
        if(input.old && pass_valid && new_con) {
            set_error({
                old: false,
                new: false,
                con: false
            })

            const res = await change_password(key, input.new, input.old)
        
            if(res) {
                toast.success("Password change")

                set_input({
                    old: "",
                    new: "",
                    con: ""
                })
            } else {
                toast.error("invalid password")
            }
        }
    }

    useEffect(() => {
        Error_check()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])
    //password_popup

    if(!urlSearchParams().key) {
        return null
    }
    return(
        <FabeCont className="change-password mod" status={status} close={() => setStatus(false)}>
            <div className="mod-close" onClick={() => setStatus(false)}>
                <img src="https://skyrex.io/img/mod-close.svg" alt="" />
            </div>
            <p className="change-password-title">
                Change password
            </p>
            <div className="change-password-block">
                <p className={error.old ? "change-password-block-title red" : "change-password-block-title"}>
                    Old password
                </p>
                <div className="change-password-block-input">
                    <input type="text" placeholder={"Old password"} value={input.old} name="old" onChange={onChange}/>
                </div>
            </div>
            <div className="change-password-block">
                <p className={error.new ? "change-password-block-title red" : "change-password-block-title"}>
                    New password
                </p>
                <div className="change-password-block-input">
                    <input type="text" placeholder={"New password"} value={input.new} name="new" onChange={onChange}/>
                </div>
            </div>
            <div className="change-password-block">
                <p className={error.con ? "change-password-block-title red" : "change-password-block-title"}>
                    {"Confirm new password"}
                </p>
                <div className="change-password-block-input">
                    <input type="text" placeholder={"Confirm new password"} value={input.con} name="con" onChange={onChange}/>
                </div>
            </div>
            <div className="dashboard-btn" onClick={() => Submit()}>{"Save"}</div>
        </FabeCont>
    )
}