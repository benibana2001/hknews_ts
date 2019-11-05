import { StoryData } from './ts/HKNews'
import HTMLWriter from './ts/Writer/HTMLWriter'
import PacketManager from './ts/Story/PacketManager'

export default class Render {
    public packetManager = new PacketManager()
    public hw = new HTMLWriter()
    public quereAry: Promise<any>[] = []// queueのPromiseを格納
    public isLockedLoading: boolean = false
    public isLockedRendering: boolean = false

    constructor() { }

    public render = async(): Promise<any> => {
        await this.packetManager.loadSinglePacket()
        // 並び替え実行
        let sortedStryAry: StoryData[] = this.packetManager.getSinglePacket()
        console.log(sortedStryAry)
        // 全件書き出し
        for (let i = 0; i < sortedStryAry.length; i++) {
            // console.log(`${i} を書き込み中( been writing ${i})`)
            await this.hw.write(sortedStryAry[i])
        }
        console.log("書き込み完了 ( finished writing )")
        // パケットを空にする
        this.packetManager.clearSinglePacket()
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