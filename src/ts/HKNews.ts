export { StoryData, URL }

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
