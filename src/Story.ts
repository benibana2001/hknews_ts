export default class Story {
    private HKN_TOP_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    private HKN_STORY_URL = 'https://hacker-news.firebaseio.com/v0/item/'
    private EXTENSION = '.json?print=pretty'
    private id: number = 0
    private stryURL: string = ""
    private type: any = 'json'
    private rqst: XMLHttpRequest = new XMLHttpRequest()
    constructor() {}

    public setID(id: number) {
        this.id = id
        this.setStryURL()
    }

    private setStryURL() {
        this.stryURL = this.HKN_STORY_URL + this.getID() + this.EXTENSION
    }

    private setRqst() {
        // You cannot set responseType when state is LOADING or DONE
        if (this.rqst.readyState !== 4) this.rqst.responseType = this.type
    }

    public getID(): string {
        return String(this.id)
    }

    public getTop(top: number): Promise<any>{
        return new Promise((resolve, reject) => {
            this.setRqst()
            this.rqst.open("GET", this.HKN_TOP_URL)
            this.rqst.onload = () => {
                // 返り値をAny型で処理
                let response: any = this.rqst.response
                resolve(response.slice(0, top))
            }
            this.rqst.send(null)
        })
    }

    public getStry(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.setRqst()
            this.setID(id)
            this.rqst.open("GET", this.stryURL)
            this.rqst.onload = () => {
                let response: any = this.rqst.response
                // 返り値をAny型で処理
                // this.stories.push(response)
                resolve(response)
            }
            this.rqst.send(null)
        })
    }
}