import StoryCollecter from './ts/Story/StoryCollecter'
import StoriesIterator from './ts/Story/StoriesIterator'
import { StoryData } from './ts/HKNews'
import { isOnPageBttm } from './ts/Utility'
import HTMLWriter from './ts/Writer/HTMLWriter'

export default class Render {
    public stryCollector: StoryCollecter = new StoryCollecter(30)
    public iterator: StoriesIterator = this.stryCollector.iterator()
    public hw = new HTMLWriter()
    public stryPacket: StoryData[] = []// StoryDataを指定個数だけ格納する, 上書きされる
    public quereAry: Promise<any>[] = []// queueのPromiseを格納
    public ticking: boolean = false

    constructor() {
        window.addEventListener('scroll', () => {
            let lastScrllY: number = window.scrollY
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    // console.log(isOnPageBttm())
                    if (isOnPageBttm()) this.load()
                    this.ticking = false
                })
                this.ticking = true
            } else {
                console.log("ページ下部に到達。書き込み完了を待機. ( YOU CAME BOTOOM OF THE PAGE, BUT PLEASE WAIT SO THAT WRITING WILL FINISH SAFELY )")
            }
        })
    }





    public lockLoadTrigger = (): void => {
        this.ticking = true
    }

    public UnLockLoadTrigger = (): void => {
        this.ticking = false
    }

    public isLocked = (): boolean => {
        return this.ticking
    }

    // fetchをキュー
    public queueNxtStry = async (): Promise<any> => {
        // Rawデータを格納
        let sd: StoryData = await this.iterator.next()
        this.stryPacket.push(sd)
    }
    // StoryData取得・描画の基準点
    public load = async (): Promise<any> => {
        await this.stryCollector.init()// 初回だけ実行される
        while (this.iterator.hasNext()) {
            this.quereAry.push(this.queueNxtStry())
        }

        // スクロールローディングのLOCK開始
        this.lockLoadTrigger()
        this.render()
    }

    // SotryDataの全パケット受信完了を待機
    public doneFetchPacket = async (): Promise<any> => {
        await Promise.all(this.quereAry)
    }
    
    // 通信、Card書き込み処理中はロック
    public render = async (): Promise<any> => {
        await this.doneFetchPacket()

        // 並び替え実行
        let sortedStryAry: StoryData[] = this.iterator.sortAryBbl(this.stryPacket)
        console.log(sortedStryAry)
        // 全件書き出し
        for (let i = 0; i < sortedStryAry.length; i++) {
            console.log(`${i} を書き込み中( been writing ${i})`)
            await this.hw.write(sortedStryAry[i])
        }
        console.log("書き込み完了 ( finished writing )")
        // パケットを空にする
        this.stryPacket = []
        // ロックを解除する
        this.UnLockLoadTrigger()
    }

}