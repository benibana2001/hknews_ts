export default class Story {
    private HKN_TOP_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    private HKN_STORY_URL = 'https://hacker-news.firebaseio.com/v0/item/'
    private EXTENSION = '.json?print=pretty'
    private _id!: number
    private stryURL!: string
    private type: any = 'json'
    private rqst: XMLHttpRequest = new XMLHttpRequest()
    constructor() {}

    set id(id: number) {
        this._id = id
        // set stryURL
        this.stryURL = this.HKN_STORY_URL + this.id + this.EXTENSION
    }

    get id(): number {
        return this._id
    }

    private setRqst() {
        // 孔明の罠 You cannot set responseType when state is LOADING or DONE
        if (this.rqst.readyState !== 4) this.rqst.responseType = this.type
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
            this.id = id
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