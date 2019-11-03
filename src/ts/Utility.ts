export { isOnPageBttm }
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

let isOnPageBttm = (): boolean => {
    let elem: Element = document.body
    let crrntWndwY: number = window.scrollY
    let crrntWndwH: number = window.innerHeight
    let crrntElemH: number = elem.scrollHeight

    // marginTopの値を調整
    if (crrntWndwY + crrntWndwH >= crrntElemH) {
        return true
    }
    return false
}
