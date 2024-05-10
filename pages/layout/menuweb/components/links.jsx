import { useSelector, useDispatch } from "react-redux"

import { links_menu } from '../../setting'

import { set_url_params_links } from "../../../../_dispatch/menu"

export const Links = () => {
    const dispatch = useDispatch()
    const index = useSelector(state => state.global.url.index)

    return (
        <ul className="menu">
            {
                links_menu.map((v, i) => {
                    return (
                        <li key={i} className={"menu-item " + (Number(index) === v.index ? "active" : "")}>
                            {
                                v.htpps ?
                                <a href={v.index} className="menu-link" target="_blank" rel="noopener noreferrer">
                                    <div className="menu-link-icon">
                                        <img src={v.icon} alt="" />
                                        <img src={v.icon_active} alt="" />
                                    </div>
                                    <div className="menu-link-title">
                                        <p>{v.label}</p>
                                    </div>
                                </a>
                                :
                                <div className="menu-link" onClick={() => dispatch(set_url_params_links(v.index))}>
                                    <div className="menu-link-icon">
                                        <img src={v.icon} alt="" />
                                        <img src={v.icon_active} alt="" />
                                    </div>
                                    <div className="menu-link-title">
                                        <p>{v.label}</p>
                                    </div>
                                </div>
                            }
                            
                        </li>
                    )
                })
            }
        </ul>        
    )
}