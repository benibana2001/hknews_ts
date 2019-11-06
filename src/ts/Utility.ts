export { reachedPageBttmFrom }
/* ************************
** define some util function
** ********************** */
function deferFunc(f: Function, t: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            f()
            resolve(`${f} was occured`)
        }, t)
    })
}

let reachedPageBttmFrom = (perFromBttm: number): boolean => {
    let elem: Element = document.body
    let crrntWndwY: number = window.scrollY
    let crrntWndwH: number = window.innerHeight
    let crrntElemH: number = elem.scrollHeight

    // marginTopの値を調整
    if (crrntWndwY + crrntWndwH >= crrntElemH * perFromBttm) {
        return true
    }
    return false
}

let isOnPage90per = (): boolean => {
    let elem: Element = document.body
    let crrntWndwY: number = window.scrollY
    let crrntWndwH: number = window.innerHeight
    let crrntElemH: number = elem.scrollHeight

    // marginTopの値を調整
    if (crrntWndwY + crrntWndwH >= crrntElemH * 0.9) {
        return true
    }
    return false
}
let isOverPage60per = (): boolean => {
    let elem: Element = document.body
    let crrntWndwY: number = window.scrollY
    let crrntWndwH: number = window.innerHeight
    let crrntElemH: number = elem.scrollHeight

    // marginTopの値を調整
    if (crrntWndwY + crrntWndwH >= crrntElemH * 0.6) {
        return true
    }
    return false
}
