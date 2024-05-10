export const str_fa = (evt) => {
    if(evt.length > 3) {
        const s = evt.split("")

        let str = ""

        let i = 0

        while(true) {
            if(i >= s.length) {break}
                if(i === 3) {
                    str = str + " "
                }
                str = str + s[i]
            i++
        }
        
        return str
    }

    return evt
}