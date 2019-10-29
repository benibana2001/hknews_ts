import Download from "./Download"

export default class Story extends Download{
    private _id!: number
    private stryURL!: string

    constructor(id: number) {
        super()
        this.id = id
    }

    set id(id: number) {
        this._id = id
        // set stryURL
        this.stryURL = this.HKN_STORY_URL + this.id + this.EXTENSION
    }

    get id(): number {
        return this._id
    }

    public async get(): Promise<any> {
        /*
        return new Promise((resolve, reject) => {
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
        */
        fetch(this.stryURL).then(
            function (response) {
                return response.json()
            }
        )
    }
}