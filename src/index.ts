import * as Defer from './Defer'
/*
    Defer.deferFunc(() => {console.log("1: hello defer")}, 100)
    .then(
        () => {return Defer.deferFunc(() => {console.log("2: hello defer")}, 100)}
    ).then(
        () => {return Defer.deferFunc(() => {console.log("3: hello defer")}, 100)}
    )
    */
const HKN_TOP_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
const HKN_STORY_URL = 'https://hacker-news.firebaseio.com/v0/item/'
const EXTENSION = '.json?print=pretty'

function getStryURL (id: string): string {
    return HKN_STORY_URL + id + EXTENSION
}

class Print implements Defer.Writer {
    write(txt: string): void {
        console.log(txt)
    }
    constructor() { }
}

Defer.getHTHML(HKN_TOP_URL, new Print)
    .then(() => {
        console.log("DONE")
    })