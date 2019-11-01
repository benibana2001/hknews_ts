export { StoryData, URL, DOMCreator, isOnPageBttm }

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
    EXTENSION: string
}

const URL: URLType = {
    HKN_TOP_URL: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    HKN_STORY_URL: 'https://hacker-news.firebaseio.com/v0/item/',
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
    if (crrntWndwY + crrntWndwH >= crrntElemH + 14) {
        return true
        // alert("bottom")
    }
    return false
}

// todo: 不要なプロパティを削除
// HTMLWriterでしか使用しないので has-a関係としてHTMLWriterに持たせる
// todo: create()メソッドを使用して インスタンスは一つ立てればよい構造にする
class DOMCreator {
    public elem!: Element
    private parent!: Element
    private className!: string
    private url!: string
    private text!: string

    constructor(tag: string | null, parent: Element, className: string | null, url: string | null, text: string | null) {
        if (tag !== null) {
            this.elem = document.createElement(tag)
        }
        if (parent !== null) {
            this.parent = parent
        }
        if (className !== null) {
            this.className = className
            this.elem.className = className
        }
        if (url !== null) {
            this.url = url
            this.elem.setAttribute("href", url)
        }
        if (text !== null) {
            this.text = text
            this.elem.textContent = text
        }
    }

    public add(): void {
        this.parent.appendChild(this.elem)
    }
}