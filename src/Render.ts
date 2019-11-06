import { StoryData } from './ts/HKNews'
import HTMLWriter from './ts/Writer/HTMLWriter'
import PacketManager from './ts/Story/PacketManager'

export default class Render {
    public hw = new HTMLWriter()
    public isLockedLoading: boolean = false
    public isLockedRendering: boolean = false

    constructor() { }

    public render = async (stryAry: StoryData[]): Promise<any> => {
        for (let i = 0; i < stryAry.length; i++) {
            // console.log(`${i} を書き込み中( been writing ${i})`)
            await this.hw.write(stryAry[i])
        }
        console.log("書き込み完了 ( finished writing )")
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