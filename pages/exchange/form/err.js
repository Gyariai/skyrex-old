export const check_err = (data) => {

    const { subaccount_name, passphrase, apikey, secretapikey, sub, pass } = data
    let status = true


    const copy_err = {
        api: false,
        secret: false,
        pass: false,
        sub: false
    }

    if(apikey.length < 5) {
        copy_err.api = true
        status = false
    }
    if(secretapikey.length < 5) {
        copy_err.secret = true
        status = false
    }
    if(sub && subaccount_name.length < 5) {
        copy_err.sub = true
        status = false
    }

    if(pass && passphrase.length < 3) {
        copy_err.pass = true
        status = false
    }

    return { status, err: copy_err }
}

export const errData = {
    api: false,
    secret: false,
    pass: false,
    sub: false
}