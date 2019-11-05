import StoryCollecter from './ts/Story/StoryCollecter'
import StoriesIterator from './ts/Story/StoriesIterator'
import { StoryData } from './ts/HKNews'
import { isOnPageBttm } from './ts/Utility'
import HTMLWriter from './ts/Writer/HTMLWriter'

export default class Render {
    public stryCollector: StoryCollecter = new StoryCollecter(30)
    public iterator: StoriesIterator = this.stryCollector.iterator()
    public hw = new HTMLWriter()
    public quereAry: Promise<any>[] = []// queueのPromiseを格納
    public isLockedLoading: boolean = false
    public isLockedRendering: boolean = false

    constructor() { }

    // SotryDataの全パケット受信完了を待機
    public doneFetchPacket = async (): Promise<any> => {
        await Promise.all(this.quereAry)
    }

    // fetchをキュー
    public queueNxtStry = async (): Promise<any> => {
        // Rawデータを格納
        await this.iterator.next()
    }

    // StoryData取得・描画の基準点
    // TODO: Packetのロード機能はStoryCollecterに任せる方が賢明か
    public loadSinglePacket = async (): Promise<any> => {
        await this.stryCollector.init()// 初回だけ実行される
        while (this.iterator.hasNext()) {
            this.quereAry.push(this.queueNxtStry())
        }
        await this.doneFetchPacket()
    }

    public render = async(): Promise<any> => {
        await this.loadSinglePacket()
        // 並び替え実行
        let sortedStryAry: StoryData[] = this.stryCollector.getSinglePacket()
        console.log(sortedStryAry)
        // 全件書き出し
        for (let i = 0; i < sortedStryAry.length; i++) {
            // console.log(`${i} を書き込み中( been writing ${i})`)
            await this.hw.write(sortedStryAry[i])
        }
        console.log("書き込み完了 ( finished writing )")
        // パケットを空にする
        this.stryCollector.clearSinglePacket()
        // ロックを解除する
        this.unLockRendering()
        console.log("書き込み完了 レンダー ロック解除します。")
    }

    public lockLoading = (): void => {
        this.isLockedLoading = true
    }

    public unLockLoading = (): void => {
        this.isLockedLoading = false
    }

    public lockRendering = (): void => {
        this.isLockedRendering = true
    }

    public unLockRendering = (): void => {
        this.isLockedRendering = false
    }
}