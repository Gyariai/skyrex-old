import {  useDispatch } from 'react-redux'
import { set_table_sort } from '../../../_dispatch/table'

export const Row = ({ rows, mobile, table_store = "close", row_class }) => {
    const dispatch = useDispatch()

    const Sort = (v) => {
        dispatch(set_table_sort(table_store, v))
    }

    return (
        <div className={mobile !== "none" ? "trading-table-row trading-table-row-head": "commissions-inner-row commissions-inner-row-head"}>
            {
                rows.map((v, i) => {
                    return (
                        <div key={i} className={row_class ? row_class : "trading-table-row-col"}>
                            <p className='flex_center' style={{ flexWrap: "nowrap" }}>
                                {v.text}
                                {
                                    v.sortable ? <span className="trading-table-row-col-icon" style={{cursor: "pointer"}}>
                                            <img src="https://skyrex.io/img/sort.svg" alt="" onClick={() => Sort(v)}/>
                                    </span> : null
                                }
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}