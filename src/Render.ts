import { StoryData } from './ts/HKNews'
import HTMLWriter from './ts/Writer/HTMLWriter'

export default class Render {
    public hw = new HTMLWriter()
    public _isLockedRendering: boolean = false

    constructor() { }

    public render = async (stryAry: StoryData[]): Promise<any> => {
        this.lockRendering()
        // console.log("書き込み開始 レンダー ロックします")
        for (let i = 0; i < stryAry.length; i++) {
            // console.log(`${i} を書き込み中( been writing ${i})`)
            await this.hw.write(stryAry[i])
        }
        // console.log(`書き込んだstryAryの長さ: ${stryAry.length}`)
        // ロックを解除する
        this.unLockRendering()
        // console.log("書き込み完了 レンダー ロック解除します。")
    }

    private lockRendering = (): void => {
        this._isLockedRendering = true
    }

    private unLockRendering = (): void => {
        this._isLockedRendering = false
    }

    get isLockedRendering() : boolean {
        return this._isLockedRendering
    }
}