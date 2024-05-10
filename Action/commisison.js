export const commision = (bal) => {
    if(bal >= 5000 && bal < 15000) {
        return 0.4
    }
    if(bal > 15000 && bal < 35000) {
        return 0.35
    }
    if(bal > 35000 && bal < 75000) {
        return 0.3
    }
    if(bal > 75000) {
        return 0.25
    }

    return 0.4
}

export const lvl = (per) => {
    const comm = per * 100

    if(comm >= 36 && comm <= 100) {
        return 1
    }
    if(comm >= 31 && comm <= 35) {
        return 2
    }
    if(comm >= 26 && comm <= 30) {
        return 3
    }
    if(comm <= 25) {
        return 4
    }
    return 1
}