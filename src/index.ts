import './scss/style.scss'
import Render from './Render'
import PacketManager from './ts/Story/PacketManager'
import { reachedPageBttmFrom } from './ts/Utility'
import { StoryData } from './ts/HKNews'

const renderer: Render = new Render()
const packetManager: PacketManager = new PacketManager()

// TODO: 90%未満の時(いや、スクロール時は常に) パケットが受信されているかチェック実行
window.addEventListener('scroll', () => {
    window.requestAnimationFrame(async (): Promise<any> => {
        if (reachedPageBttmFrom(0.93)) {
            if (renderer.isLockedRendering === false) {
                await render()
            } else {
                // console.log("")
            }
        } else {
            await load()
        }
    })
})

let isLoaded: boolean = false
let isLoading: boolean = false

// ロードを実行
let load = async (): Promise<boolean> => {
    // ロード済みか確認
    if (isLoaded === true) {
        console.log("1: 成功 データあり") 
        return true// 成功
    } else {
        if (packetManager.getSinglePacket().length >= 30) {
            console.log("2: 成功 データあり")
            return true// 成功
        } else {
            // ロード中か確認
            if (isLoading === true) {
                console.log("3: 中断 データロード中")
                return false// 失敗 loadはキャンセルされる
            } else {
                isLoading = true
                await packetManager.loadSinglePacket()
                console.log("4: 成功 データ取得完了")
                isLoaded = true
                isLoading = false
                return true// 成功
            }
        }
    }
}

let render = async (): Promise<any> => {
    let successLoad = await load()
    if (!successLoad) { return false }

    console.log('A: データ確認OK レンダリング開始')

    let singlePacket: StoryData[] = packetManager.getSinglePacket()
    await renderer.render(singlePacket)
    packetManager.afterRendering()
    isLoaded = false// 完了後はFALSE
}

render()

// TODO: 最下部への到達が早いとスクロールイベントをキャッチできない
// よってOnPageBttm の状態が数秒間続いた時は view() を実行
