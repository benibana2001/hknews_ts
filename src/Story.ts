import Download from "./Download"
import { StoryData, URL } from "./HKNews"
import HTMLWriter from "./HTMLWriter"

export default class Story extends Download {
    private _id!: number
    private stryURL!: string
    public storyData!: StoryData
    // fetch実行時 データ割り込み
    private cutInProp: number | null = null

    constructor(id: number) {
        super()
        this.id = id
    }

    set id(id: number) {
        this._id = id
        // set stryURL
        this.stryURL = URL.HKN_STORY_URL + this.id + URL.EXTENSION
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
        // 割り込みデータ
        let cutInProp: number | null = this.cutInProp
        console.log(cutInProp)
        let response: StoryData = await this.get()
        // console.log(response)
        this.storyData = response
        if (cutInProp !== null) {
            console.log(cutInProp)
            this.storyData.rank = cutInProp
        }
        console.log(this.storyData)
        return this.storyData
    }

    public fetchCutIn(prop: number): void {
        this.cutInProp = prop
    }

    public fetchCutOut(): void {
        this.cutInProp = null
    }

    /*
    public writeHTML(): void {
        let w: HTMLWriter = new HTMLWriter()
        // w.write()
    }
    */
}