import Download from "./Download"

export default class Story extends Download{
    private _id!: number
    private stryURL!: string

    set id(id: number) {
        this._id = id
        // set stryURL
        this.stryURL = this.HKN_STORY_URL + this.id + this.EXTENSION
    }

    get id(): number {
        return this._id
    }

    public get(id: number): Promise<any> {
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