import Download from "./Download"
import { StoryData } from "./HKNews"
import HTMLWriter from "./HTMLWriter"

export default class Story extends Download{
    private _id!: number
    private stryURL!: string
    private storyData!: StoryData

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
        let response: any = await fetch(this.stryURL)
        let json: any = await response.json()
        return json
    }

    public async fetch(): Promise<any> {
        let response: StoryData = await this.get()
        // console.log(response)
        this.storyData = response
    }

    public writeHTML(): void {
        let w: HTMLWriter = new HTMLWriter()
        // w.write()
    }
}