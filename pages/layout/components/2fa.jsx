import { useSelector } from "react-redux"

import { useEffect, useState } from "react"

import { EnableQR } from "./qr/enable"
import { DisableQR } from "./qr/disable"
import { ResetQR } from "./qr/reset"


import { urlSearchParams } from "../../../Action/store/url"

export const TwoFA = () => {
    const user = useSelector(state => state.userdata.user)
    const [ select, setSelect ] = useState(false)
    const [ reset, setReset ] = useState(false)

    const switchSlider = (e) => {
        setSelect(e.target.checked)
    }

    useEffect(() => {
        if(user.two_auth) {
            setSelect(true)
        } else {
            setSelect(false)
        }
    }, [user])

    useEffect(() => {
        const sliders = document.querySelectorAll('[data-id="qr-slider" ]')

        for(let slider of sliders) {
            slider.checked = select
        }
        // eslint-disable-next-line
    }, [select])

    if(!urlSearchParams().key) {
        return null
    }

    return (
        <>
            <ResetQR status={reset && !!user.two_auth} close={() => setReset(false)} />
            <DisableQR status={!select && !!user.two_auth} close={() => setSelect(true)} />
            <EnableQR status={select && !!user.two_auth === false} close={() => setSelect(false)} />
            <hr />
                <div className="fa-conteiner-menu">
                    <span style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, color:" rgba(255, 255, 255, 0.7)" }}>
                        2FA Confirmation
                        <label className="switch">
                            <input value={select} data-id={"qr-slider"} type="checkbox" onChange={switchSlider}/>
                            <span className="slider round"></span>
                        </label>
                    </span>
                    <span style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
                        We use Google Authenticator for your safety
                    </span>
                    <div   
                        style={{
                            height: 35, marginTop: 10
                        }}
                        className={"account-content-mode-item light-mode active"}
                    >
                        <div className="account-content-mode-item-title" onClick={() => setReset(true)}>
                            <p>
                                Reset 2FA
                            </p>
                        </div>
                    </div>    
                </div>
            <hr />
        </>
    )
}