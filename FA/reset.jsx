import { useState } from 'react'
import { Helmet } from "react-helmet"
import { resetfatoken, resetfatokenstatus } from "../axios/2fa"
import { QRCodeCanvas } from 'qrcode.react';
import { Err } from '../pages/layout/components/qr/err'

export const Resset = ({ setPage, email }) => {
    const [ key ] = useState(false)
    const [ win, setWin] = useState(false)
    const [ value, setValue] = useState("")
    const [ err, setErr] = useState(false)

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

    if(win === false) {
        return (
            <>
            <Helmet>
                <link rel="stylesheet" href="https://skyrex.io/login/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://skyrex.io/login/css/main.css?v2" />
                <link rel="stylesheet" href="https://skyrex.io/login/css/style.css?v3" />
                <link rel="stylesheet" href="https://skyrex.io/login/disk//slidercaptcha.css" />
            </Helmet>
            <section className="sign">
                <div className="sign-img">
                    <img src="https://skyrex.io/login/img/sign-img.svg" alt="" />
                </div>
                <div className="container">
                <div className="row">
                <div className="col-12">
                    <div className="sign-block">
                    <div className="sign-logo-block">
                        <a href="https://skyrex.io/" className="sign-logo">
                        <img src="https://skyrex.io/login/img/sign-logo.svg" alt="" />
                        </a>
                    </div>
                    <div className="sign-inner">
                        <div className="sign-inner-item sign-in">
                        <div className="sign-input">
                            <p className="sign-title-h">
                                Dear user!
                            </p>
                            <p className="sign-title">
                                According to 2FA disabling flow, all your public APi keys 
                                will be deleted after the automatic reset of 2FA which will happen
                                in 5 days.
                            </p>
                            
                        </div>
                        <br />
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", paddingTop: 10}}>
                            <div onClick={() => SubmitEmail()} className="dashboard-btn-fa" >
                                <span className="title-fa-h" style={{color: "white"}}>Submit</span>    
                            </div>
                            <div style={{padding: 5}}/>
                            <div onClick={() => setPage("auth")} className="dashboard-btn-fa"  style={{backgroundColor: "#3A3A3C"}}>
                                <span className="title-fa-h" style={{color: "white" }}>Cancel</span>    
                            </div>
                        </div>
                        <br />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
            </>
        )
    }

    return (
        <>
        <Helmet>
            <link rel="stylesheet" href="https://skyrex.io/login/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://skyrex.io/login/css/main.css?v2" />
            <link rel="stylesheet" href="https://skyrex.io/login/css/style.css?v3" />
            <link rel="stylesheet" href="https://skyrex.io/login/disk//slidercaptcha.css" />
        </Helmet>
        <section className="sign">
            <div className="sign-img">
                <img src="https://skyrex.io/login/img/sign-img.svg" alt="" />
            </div>
            <div className="container">
                <div className="row">
                <div className="col-12">
                    <div className="sign-block">
                    <div className="sign-logo-block">
                        <a href="https://skyrex.io/" className="sign-logo">
                        <img src="https://skyrex.io/login/img/sign-logo.svg" alt="" />
                        </a>
                    </div>
                    <div className="sign-inner">
                        <div className="sign-inner-item sign-in">
                        <div className="sign-input">
                            <p className="sign-title-h">
                                2FA Restore
                            </p>
                            {
                                key ?
                                <>
                                <p className="sign-title">
                                    After 2FA activation the IP-adress check will be disabled. If necessary, you can enable it yourself.
                                </p>
                                <div style={{
                                    padding: 10, display: "flex", justifyContent: "center"
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
                                    <p className="sign-title">
                                        Enter reset code from your email
                                    </p>
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
                                    <Err err={err} />
                                </>
                            }
                            
                        </div>
                        <br />
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", paddingTop: 10}}>
                            <div onClick={() => key ? setPage("auth") : ResetToken()} className="dashboard-btn-fa" >
                                <span className="title-fa-h" style={{color: "white"}}>{key ? "Ok" : "Submit"}</span>    
                            </div>
                            <div style={{padding: 5}}/>
                            <div onClick={() => setPage("auth")} className="dashboard-btn-fa"  style={{backgroundColor: "#3A3A3C"}}>
                                <span className="title-fa-h" style={{color: "white" }}>Cancel</span>    
                            </div>
                        </div>
                        <br />
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", paddingTop: 10}}>
                            <a href="https://skyrex.io/login/logout">
                                <div onClick={() => null} className=""  style={{ backgroundColor: "white", cursor: "pointer"}}>
                                    <span className="title-fa-h" style={{color: "black", textDecoration: "underline"}}>Log out</span>    
                                </div>
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
        </>
    )
}