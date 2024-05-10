export function isValid(s) {

    // check for null or too short

    if (!s || s.length < 6) {
        return false;
    }

    // check for a number

    if (!/[0-9]/.test(s)) {
        return false;
    }

    // check for a capital letter

    if (!/[A-Z]/.test(s)) {
        return false;
    }

    // check for a lowercase letter

    if (!/[a-z]/.test(s)) {
        return false;
    }

    return true;
}