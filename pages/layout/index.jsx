import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import moment from 'moment'

import { check_api } from "../../axios/user"

import { Loading, LoadingData } from "./loading"

import $ from "jquery"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MenuWeb } from "./menuweb"
import { HeaderMobile } from "./headermobile"
import { HeaderWeb } from "./headerweb"

import { getuserdata } from "../../axios/user"
import { get_trade_user, gettabledemo_v2 } from "../../axios/table"
import { checktokenfa } from "../../axios/2fa"

import { set_user_data, set_damo_balance } from "../../_dispatch/user"
import { first_load } from "../../_dispatch/menu"
import { set_table_data } from "../../_dispatch/table"

import { splitBalance } from "../../Action/balance"

import { Auth } from "../../FA/auth"

import { Expire } from "./expire"

export function Layout({ children }){
    const dispatch = useDispatch()
    const url = useSelector(state => state.global.url)
    const theme = useSelector(state => state.global.theme)
    const firstload = useSelector(state => state.global.firstload)

    const userdata = useSelector(state => state.userdata)
    const email = useSelector(state => state.userdata.user.email)
    
    const [ expire, setExpire ] = useState(false)
    const [ verify, setVerify ] = useState(false)

    useEffect(() => {
        (async function Axios() {
            if(url.key) {
                const result = await getuserdata(url.key)
              
       
                if(result) {
                    dispatch(set_user_data(result))
                }

                /// проврека токена 2fa
                const urlSearchParams = new URLSearchParams(window.location.search);
                const { token } = Object.fromEntries(urlSearchParams.entries());
         
                if(result?.data?.email) {
                    const result_fa = await checktokenfa(result.data.email, localStorage.getItem("token_fa"), token)
           
                    if(result_fa) {
                        setVerify(result_fa.status)
                        dispatch(first_load())
                    }
                }
                
            } else {
                dispatch(first_load())
            }
        })()
         // eslint-disable-next-line
    }, [url])

    useEffect(() => {
        if(email !== "demo@gmail.com") {
            check_api(email)
            .then(res => {
                setExpire(res)
            })
            
        }
    }, [email])

    const [ loadingTable, setLoadingtable ] = useState(false)
    const [ data, setDate ] = useState(null)

    useEffect(() => {
       
        if(userdata.user.email !== "demo@gmail.com" && firstload === false && data?.month !== userdata.currBalance.month) {
            (async function getTrade() {
                setDate(userdata.currBalance)
                setLoadingtable(true)
                const trades = await get_trade_user(userdata.user.email, userdata.currBalance)
                dispatch(set_table_data(trades))
                setLoadingtable(false)
                
            })()
        }

        if(!!url.key === false) {

            (async function getTrade() {

                setLoadingtable(true)

                if(userdata.currBalance.year === 2000) {
                    const trades = await gettabledemo_v2()
                    const bal = trades.balance[trades.balance.length - 1]

                    setDate(splitBalance(bal))

                    dispatch(set_damo_balance(trades.balance))
                    dispatch(set_table_data(trades.table.tableCell))
                } else {
                    if(userdata.currBalance.year !== 2000 && data?.month !== userdata.currBalance.month) {
                        if(data === null) {
                            setDate(userdata.currBalance)
                        } else {

                            const date = moment(new Date(userdata.currBalance.year, userdata.currBalance.month - 1)).format("YYYY-MM")

                            const trades = await gettabledemo_v2(date)
                            setDate(userdata.currBalance)

                            dispatch(set_table_data(trades.table.tableCell))
                        }
                    }
                }

                
                
                setLoadingtable(false)
            })()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userdata, firstload])
    

    useEffect(() => {
        if(theme === "dark") {
            $('.shadow').addClass('dark');
            $('body').addClass('dark');
            $('.account-header-text').addClass('dark');
            $('.account-header-arrow').addClass('dark');
        } else {
            $('.shadow').removeClass('dark');
            $('body').removeClass('dark');
            $('.account-header-text').removeClass('dark');
            $('.account-header-arrow').removeClass('dark');
        }
    }, [theme])

    if(firstload) {
        return <Loading />
    }

    if(verify === "no_auth") {
        return <Auth setVerify={setVerify}/>
    }

    if(loadingTable) {
        return <LoadingData />
    }

    return (
        <>
            <Expire  status={expire} close={() => setExpire(false)} email={email} />
            <ToastContainer />
            <MenuWeb />
            <HeaderMobile />
            <section className="dasboard">
                <div className="content">
                <HeaderWeb/>
                { children }
                </div>
            </section>
        </>
    )
}
