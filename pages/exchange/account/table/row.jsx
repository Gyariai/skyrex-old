import { useDispatch } from 'react-redux'

import { set_table_sort } from '../../../../_dispatch/table'

export const Row = ({ rows, table_store }) => {
    const dispatch = useDispatch()

    const Sort = (v) => {
        dispatch(set_table_sort(table_store, v))
    }
  
    return (
        <div className="exchange-block-table-row exchange-block-table-row-head">
            {
                rows.map((v, i) => {
                    return (
                        <div key={i} className="exchange-block-table-row-col">
                                <p className='flex_center'>
                                        <span className="exchange-block-table-row-col-head-title">{v.text}</span> 
                                        <span className="exchange-block-table-row-col-icon" style={{cursor: "pointer"}} ><img onClick={() => Sort(v)} src="https://skyrex.io/img/sort.svg" alt=""/></span>
                                </p>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}