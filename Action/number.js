export const number_string = (evt) => {
    const sss =  String(evt)
    if(sss.length === 0) {
        return ""
    }
    const num = parseInt(sss.replace(/[^\d]/g, ''))

    const newInput = String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    return newInput
}

export const number_number = (evt) => {
    return parseInt(evt.replace(/[^\d]/g, ''))
}

export const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU').format(num);
}