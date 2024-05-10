import { FabeCont } from '../../../../lib/fabe'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { resetfatoken, resetfatokenstatus } from '../../../../axios/2fa'

import { QRCodeCanvas } from 'qrcode.react';
import { Err } from './err'

export const ResetQR = ({ status, close }) => {
    const [key, setKey] = useState(false)
    const [win, setWin] = useState(false)
    const [ err, setErr] = useState(false)

    const email = useSelector(state => state.userdata.user.email)
    const Canc = () => {
        setKey("")
        setWin(false)
        close()
    }

    const [ value, setValue] = useState("")

    const onChange = (val) => {
        setValue(val)
    }

    const SubmitEmail = () => {
        setWin(true)
        resetfatoken(email)
    }

    const ResetToken = async () => {
        const status = await resetfatokenstatus(email, value)
  
        if(status) {
            localStorage.setItem("token_fa","")
            window.location.reload()
        } else {
            setErr(true)
        }
    }

    return (
        <FabeCont className="change-password mod block position_block" status={status} close={() => Canc()}>
            <div className="mod-close" onClick={() => Canc()}>
                <img src="https://skyrex.io/img/mod-close.svg" alt="" />
            </div>
            {
                win ?
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>

                    {
                        key ?
                        <>
                        <span className="title-fa-h">2FA Restore</span>
                        <p className="sign-title" style={{ textAlign: "center"}}>
                             After 2FA activation the IP-adress check will be disabled. If necessary, you can enable it yourself.
                        </p>
                        <div style={{
                            padding: 10
                        }}>
                            <QRCodeCanvas value={key.otpauth_url} /> :   
                        </div>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <span className="title-fa-s">Don’t forget to back up your secret key:</span>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", wordBreak: "break-all"}}>
                            <span className="title-fa-h">{key.base32}</span>
                        </div>
                        </>
                        :
                        <>
                            <span className="title-fa-h">Enter reset code from your email</span>
                            <div className="exchange-input" style={{ width: "100%", paddingTop: 10 }}>
                                <input 
                                    type="text"
                                    name="subaccount_name"
                                    placeholder='reset code'
                                    style={{textAlign: "center"}}
                                    onChange={(e) => onChange(e.target.value)}
                                    value={value}
                                />
                            </div>
                            <Err err={err}/>
                            <br />
                        </>
                    }
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between", paddingTop: 10}}>
                        <div onClick={() => !!key ? Canc() : ResetToken()} className="dashboard-btn-fa">
                            <span className="title-fa-h" style={{color: "white"}}>{!!key ? "Ok" : "Submit"}</span>    
                        </div>
                        <div style={{padding: 5}}/>
                        <div onClick={() => Canc()} className="dashboard-btn-fa"  style={{backgroundColor: "#3A3A3C"}}>
                            <span className="title-fa-h" style={{color: "white"}}>Cancel</span>    
                        </div>
                    </div>
                </div>
                :
                <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <span className="title-fa-h">Dear user!</span>
                    <span className="title-fa-s">According to 2FA disabling flow, all your public APi keys 
                        will be deleted after the automatic reset of 2FA which will happen
                        in 5 days.
                    </span>
                    <br />
                    <div style={{width: "100%", display: "flex", justifyContent: "space-between", paddingTop: 10}}>
                        <div onClick={() => key ? Canc() : SubmitEmail()} className="dashboard-btn-fa">
                            <span className="title-fa-h" style={{color: "white"}}>Submit</span>    
                        </div>
                        <div style={{padding: 5}}/>
                        <div onClick={() => Canc()} className="dashboard-btn-fa"  style={{backgroundColor: "#3A3A3C"}}>
                            <span className="title-fa-h" style={{color: "white"}}>Cancel</span>    
                        </div>
                    </div>
                </div>
            }
        </FabeCont>
    )
}