export default abstract class Download {
    protected readonly HKN_TOP_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    protected readonly HKN_STORY_URL = 'https://hacker-news.firebaseio.com/v0/item/'
    protected readonly EXTENSION = '.json?print=pretty'
    protected type: any = 'json'
    protected rqst: XMLHttpRequest = new XMLHttpRequest()

    constructor() {}

    protected setRqst() {
        // it's like a 孔明の罠. You cannot set responseType when state is LOADING or DONE
        if (this.rqst.readyState !== 4) this.rqst.responseType = this.type
    }

    abstract get(num: number): Promise<any>

}