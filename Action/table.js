import { sortposition } from './sort'
import { urlSearchParams } from "./store/url"

export const sortCell = (cell, search_active, search_close, table_active, table_close ) => {
    const active_cell_table = []
    const active_close_table = []

    cell.forEach(v => {
        if(urlSearchParams().key) {
            const act = v.status !== 'completed'

            let status = true
            if(act) {
                if(search_active.length > 0) {
                    status = Search(v, search_active)
                }
    
                if(status) {
                    active_cell_table.push(v)
                }
            } else {
                if(search_close.length > 0) {
                     status = Search(v, search_close)
                }
         
                if(status) {
                    active_close_table.push(v)
                }  
            }
        } else {
            const act = v.closed_at.indexOf("active") >= 0
 
            let status = true
            if(act) {
                if(search_active.length > 0) {
                    status = Search(v, search_active)
                }
    
                if(status) {
                    active_cell_table.push(v)
                }
            } else {
                if(search_close.length > 0) {
                     status = Search(v, search_close)
                }
         
                if(status) {
                    active_close_table.push(v)
                }  
            }
        }

    })


    return {
        active_cell_table: sortposition(active_cell_table, table_active),
        active_close_table: sortposition(active_close_table, table_close),
    }
}

const Search = (data, search) => {

    const values = Object.values(data)

    let res = false
    let i = 0

    values.forEach(v => {
        const text_s = Array.isArray(v) ? v[1] : v
        const s = search.toLowerCase()
        const text = String(text_s).toLowerCase()
  
        if(text.indexOf(s) >= 0 && i < 3) res = true
        i = i + 1
    })
 
    return res
}