export default abstract class {
    HKN_TOP_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    HKN_STORY_URL = 'https://hacker-news.firebaseio.com/v0/item/'
    EXTENSION = '.json?print=pretty'
    id: number = 0
    stryURL: string = ""
    type: any = 'json'
    rqst: XMLHttpRequest = new XMLHttpRequest()
}