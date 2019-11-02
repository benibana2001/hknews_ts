export { StoryData, URL, isOnPageBttm }

/* ************************
** 個別StoryのJSONパース型
** ********************** */
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

/* ************************
** ランキングに載ってくるもの: 
** ** 1. HKN_STORY_URL: 外部リンク
** ** 2. HKN_COMMENT_ORIGIN: 内部リンク（コメントへのURL）
** ********************** */
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
