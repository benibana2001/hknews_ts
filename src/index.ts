import * as HKNews from './HKNews'
/*
    Defer.deferFunc(() => {console.log("1: hello defer")}, 100)
    .then(
        () => {return Defer.deferFunc(() => {console.log("2: hello defer")}, 100)}
    ).then(
        () => {return Defer.deferFunc(() => {console.log("3: hello defer")}, 100)}
    )
    */

let c = new HKNews.Client()
// let s: string
let r: Array<Promise<any>> = []
let stories 

c.getTop(10)
    .then((value: any) => {
        let ary: number[] = value
        console.log(ary)

        for (let i: number = 0; i < ary.length; i++) {
            // r.push(c.getStry(i))
            let cc = new HKNews.Client()
            console.log(i)
            r.push(cc.getStry(ary[i]))
        }
        Promise.all(r)
            .then(() => {
                console.log(r)
                console.log(c.stories)
            })
    })