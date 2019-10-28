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
c.getTop(10)
.then((value: any) => {
    let ary: number[] = value
    console.log(ary)

    return c.getStry(ary[0])
})
.then((value: any) => {
    let story: HKNews.Story = value
    console.log(story)
})