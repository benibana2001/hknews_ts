export { StoryData, URL }

interface StoryData {
    by?: string,
    descendant?: number[],
    id: number,
    kids?: any,
    score?: number,
    time?: number,
    title: string,
    type?: string,
    url?: string
}

type URLType = {
    HKN_TOP_URL: string,
    HKN_STORY_URL: string,
    EXTENSION: string
}

const URL: URLType = {
    HKN_TOP_URL: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
    HKN_STORY_URL: 'https://hacker-news.firebaseio.com/v0/item/',
    EXTENSION: '.json?print=pretty'
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