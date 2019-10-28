export { getHTHML, Writer }

function deferFunc(f: Function, t: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            f()
            resolve(`${f} was occured`)
        }, t)
    })
}

interface Writer {
    write(txt: string): void
}

function getHTHML(url: string, f: Writer): Promise<any> {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest()
        req.open("GET", url)
        req.onload = () => {
            let body: string = req.responseText
            f.write(body)
            resolve()
        }
        req.send(null)

    })
}