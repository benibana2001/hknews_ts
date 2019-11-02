export { StoryData, URL, isOnPageBttm }

interface StoryData {
    by?: string,
    descendant?: number[],
    id: number,
    kids?: any,
    score?: number,
    time?: number,
    title?: string,
    type?: string,
    url?: string,
    rank?: number
}

type URLType = {
    HKN_TOP_URL: string,
    HKN_STORY_URL: string,
    HKN_COMMENT_ORIGIN: string,
    EXTENSION: string
}

const URL: URLType = {
    HKN_TOP_URL: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    HKN_STORY_URL: 'https://hacker-news.firebaseio.com/v0/item/',
    HKN_COMMENT_ORIGIN: 'https://news.ycombinator.com/item?id=',
    EXTENSION: '.json'
}

/*
** define some util function
** this could be omitted
*/
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
        // alert("bottom")
    }
    return false
}
