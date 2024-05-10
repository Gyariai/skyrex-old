import { useSelector } from "react-redux"

import { useState } from 'react'
import { Helmet } from "react-helmet"
import { str_fa } from '../pages/layout/components/qr/str_fa'

import { genereatetokenuser } from '../axios/2fa'

import { Err } from '../pages/layout/components/qr/err'

import { Resset } from "./reset"

export const Auth = ({ setVerify }) => {
    const email = useSelector(state => state.userdata.user.email)

    const [ page, setPage] = useState("auth")
    const [ token, setToken] = useState("")
    const [ err, setErr] = useState(false)

    const onChange = (num) => {
        let n =  num.replace(/\s/g,'')
        
        if(!!n[n.length - 1] === false && Number(n) === 0) {
            setToken("")
        } else {
            // eslint-disable-next-line
            if(isNaN(Number(n[n.length - 1])) === false && n.length < 7 || Number(n) === 0) {
                setToken(n.slice(0, 6))
            }
        }
    }

    const Ok = async () => {
        const { token_fa } = await genereatetokenuser(email, token)

        if(token_fa) {
            localStorage.setItem("token_fa", token_fa)
            setErr(false)
            setVerify(true)
        } else {
            setErr(true)
        }
    }

    if(page === "reset") {
        return <Resset setPage={setPage} email={email}/>
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
                                2FA Confirmation
                            </p>
                            <p className="sign-title">
                                Enter the 2fa code to continue working
                            </p>
                            <div className="sign-input-item input-email">
                            <input
                                type="email"
                                placeholder="2FA code"
                                id="email_sig"
                                className="war"
                                onChange={(e) => onChange(e.target.value)}
                                value={str_fa(token)}
                            />
                            </div>
                            <Err err={err} />
                        </div>
                        <br />
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", paddingTop: 10}}>
                            <div onClick={() => Ok()} className="dashboard-btn-fa" >
                                <span className="title-fa-h" style={{color: "white"}}>Ok</span>    
                            </div>
                            <div style={{padding: 5}}/>
                            <div onClick={() => setPage("reset")} className="dashboard-btn-fa"  style={{backgroundColor: "white"}}>
                                <span className="title-fa-h" style={{color: "black", textDecoration: "underline"}}>Reset 2FA</span>    
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