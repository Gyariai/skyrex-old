import { Form } from "./form"
import { AccoutData } from "./account"

import { Connect } from '../dashboard/connect/connect'
import { useSelector } from 'react-redux'
export const Exchange = () => {
    const key = useSelector(state => state.global.url.key)

    return (
        <>
        {
            !!key === false ? <Connect value={"connectDemo"}/> : null
        }
        <h2 className="trading-block-title">
            Connect an exchange using API keys
        </h2>
        <Form />
        <AccoutData />
     </>
    )
}