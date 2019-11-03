import { StoryData, URL } from "../HKNews"
import Downloader from "./DownloaderInterface"

export default class Story implements Downloader {
    private _id!: number
    private stryURL!: string
    public storyData!: StoryData
    public rowData!: any
    // fetch実行時 データ割り込み
    private cutInProp: number | null = null

    constructor(id: number) {
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

    public async download(): Promise<any> {
        let response: any = await fetch(this.stryURL)
        let json: any = await response.json()
        this.rowData = json
        // console.log(this.rowData)
        return json
    }

    public async fetch(): Promise<any> {
        // 割り込みデータ
        let cutInProp: number | null = this.cutInProp
        let response: StoryData = await this.download()
        // console.log(response)
        this.storyData = response
        if (cutInProp !== null) {
            this.storyData.rank = cutInProp
        }
        // console.log(this.storyData)
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