import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Select } from "./select"

import { create_account } from "../../../axios/user"
import { set_form_value } from "../../../_dispatch/user"

import { LoadAnimate } from '../../../lib/fabe'

import { check_err, errData } from "./err"

import { toast } from 'react-toastify';

import { set_user_user_id, set_default_cancel } from "../../../_dispatch/user"

import { get_default_formdata } from "../../../axios/user"

import { PopUpdate } from "./pop/update"
import { PopDelete } from "./pop/delete"

import { urlSearchParams } from "../../../Action/store/url"

export const Form = () => {
    const [ sub, setSub ] = useState(false)

    const [ block, setBlock ] = useState(true)

    const { subaccount_name, exchange, passphrase, apikey, secretapikey, user_id, email, uuid } = useSelector(state => state.userdata.user)

    const pass = exchange === "OKEx" || exchange === "KuCoin" || exchange === "gdax"

    const [ error, setError ] = useState(errData)

    const dispatch = useDispatch()    
    const onChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        dispatch(set_form_value(name, value))
    }

    const [ fetching, setFetching] = useState(false)

    const checkErr = {
        subaccount_name, passphrase, apikey, secretapikey, sub, pass
    }

    const dataFetch = {
        exchange, apikey, secretapikey, passphrase, subaccount_name, email
    }

    const Connect = async () => {
        let { status, err } = check_err(checkErr)

        if(status) { // конект
            setFetching(true)
            setError(errData)

            const result = await create_account(dataFetch)

            if(result?.status) {
                dispatch(set_user_user_id(result.user_id))
            } else {
                toast.error(result.error)
            }

            setFetching(false)
        } else {
            setError(err)
        }
    }

    const [popStatusUpdate, setPopUpdate ] = useState(false)

    const Update = () => {
        let { status, err } = check_err(checkErr)

        if(status) { // конект
            setPopUpdate(true)
            setError(errData)
        } else {
            setError(err)
        }
    }

    const [popStatusDelete, setPopDelete ] = useState(false)

    const Delete = () => {
        setPopDelete(true)
    }

    const Cancel = async () => {
        if(fetching === false) {
            setFetching(true)
            const result = await get_default_formdata(email)
    
            setBlock(true)
            if(result) {
                dispatch(set_default_cancel(result))
            }

            setFetching(false)
        }
       
    }

    const inputBlocked = !!user_id && block

    return (
        <>
        <PopDelete status={popStatusDelete} Cancel={Cancel} close={setPopDelete} uuid={uuid} setBlock={() => setBlock(true)}/>
        <PopUpdate status={popStatusUpdate} Cancel={Cancel} close={setPopUpdate} dataFetch={dataFetch} setBlock={() => setBlock(true)}/>
        <div className="exchange-row">
            <div className="exchange-row-item">
                <p className="exchange-row-item-title">
                    Exchange name
                </p>
                <Select />
            </div>
            <div className="exchange-row-item">
                <div className="exchange-row-item-inner">
                    <div 
                        className={"exchange-row-item-title-option " + (sub ? "active" : "")}
                        onClick={() => setSub(!sub)}
                    >
                        <div className="exchange-row-item-title-option-item "></div>
                    </div>
                    <div className="exchange-row-item-title">
                        <p>Sub-account (optional)</p>
                    </div>
                </div>
                <div className="exchange-input">
                    <input
                        disabled={inputBlocked}
                        type="text"
                        name="subaccount_name"
                        placeholder="Sub-account"
                        value={sub ? subaccount_name : "Disabled"} 
                        onChange={onChange}
                    />
                    <p className="input-ferif-title">
                        {error.sub ? "is too short (minimum is 3 characters)" : ""}
                    </p>
                </div>
            </div>
            <div className={
                "exchange-row-item exchange-passphrase " +
                (
                    pass ? "active" : ""
                )
            }>
                <p className="exchange-row-item-title">
                    Passphrase (optional)
                </p>
                <div className="exchange-input">
                    <input 
                        disabled={inputBlocked}
                        type="password"
                        name="passphrase"
                        placeholder="Passphrase"
                        value={passphrase}
                        onChange={onChange}
                    />
                    <p className="input-ferif-title">
                        {error.pass ? "is too short (minimum is 3 characters)" : ""}
                    </p>
                </div>
            </div>
            <div className="exchange-row-item input-ferif-block">
                <p className="exchange-row-item-title">
                    API public  
                </p>
                <div className="exchange-input" >
                    <input
                        disabled={inputBlocked}
                        type="text"
                        name="apikey"
                        value={apikey}
                        placeholder="API public"
                        onChange={onChange}
                    />
                    
                    <p className="input-ferif-title">
                        {error.api ? "is too short (minimum is 5 characters)" : ""}
                    </p>
                </div>
            </div>
            <div className="exchange-row-item input-ferif-block">
                <p className="exchange-row-item-title">
                    API secret
                </p>
                <div className="exchange-input">
                    <input
                        disabled={inputBlocked}
                        id="secretapikey"
                        type="password" 
                        name="secretapikey"
                        value={secretapikey}
                        placeholder="API secret" 
                        onChange={onChange}
                    />
                    <p className="input-ferif-title">
                        {error.secret ? "is too short (minimum is 5 characters)" : ""}
                    </p>
                </div>
            </div>
            {
                urlSearchParams().key ?
                <>
                {
                    !!user_id === false ?
                        <div className={"exchange-row-sub"} style={{ maxWidth: 300 }}>
                            <div  title='pause trading to edit/delete API keys' onClick={() => Connect()} className="dashboard-btn"> Connect &nbsp; {<LoadAnimate status={fetching}/>}</div>
                        </div>
                    : null     
                }
                {
                    
                    !!user_id && block ?
                        <div className={"exchange-row-sub"} style={{ maxWidth: 300 }}>
                            <div title='pause trading to edit/delete API keys' onClick={() => setBlock(false)} className="dashboard-btn">Edit</div>
                        </div>
                    : null 
                }

                {
                    !!user_id && block === false ?
                        <>
                            <div className={"exchange-row-sub"} style={{ maxWidth: 300 }} onClick={() => Update()} >
                                <div title='pause trading to edit/delete API keys' className="dashboard-btn">Save</div>
                            </div>
                            <div className={"exchange-row-sub"} style={{ maxWidth: 300 }} onClick={() => Cancel()} >
                                <div title='cancel API keys'className="dashboard-btn">Cancel</div>
                            </div>
                            <div className={"exchange-row-sub"} style={{ maxWidth: 300 }} onClick={() => Delete()}>
                                <div title='pause trading to edit/delete API keys' onClick={() => null} style={{ background: "red" }} className="dashboard-btn" >Delete</div>
                            </div>
                        </>
                    : null 
                }
                </> : null
            }
            
           
        </div>
        </>
    )
}