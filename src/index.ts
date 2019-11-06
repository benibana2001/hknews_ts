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
                await load()
                await render()
            } else {
            }
        } else {
            await load()
        }
    })
})

let isLoaded: boolean = false
let isLoading: boolean = false
let promiseLoading: Promise<any> | null = null

// ロードを実行
let load = async (): Promise<any> => {
    // ロード済みか確認
    if (isLoaded === true) return
        console.log(1)
    if (packetManager.getSinglePacket().length >= 30) return
        console.log(2)
    // ロード中か確認
    if(isLoading === true) return
        console.log(3)

    isLoading = true
    if (promiseLoading !== null) {
        console.log(4)
        await promiseLoading
        console.log(5)
    } else {
        console.log(6)
        promiseLoading = await packetManager.loadSinglePacket()
    }
        console.log(7)
        console.log(packetManager.getSinglePacket())

    isLoaded = true
    promiseLoading = null
    isLoading = false
}

let render = async (): Promise<any> => {
    await load()
    // load()完了時に担保すべきもの　⇨ packetManager.getSinglePacket()　
    //**** */

    console.log(packetManager.getSinglePacket())
    let singlePacket: StoryData[] = packetManager.getSinglePacket()
    await renderer.render(singlePacket)
    packetManager.afterRendering()
    isLoaded = false// 完了後はFALSE
}

render()

// TODO: 最下部への到達が早いとスクロールイベントをキャッチできない
// よってOnPageBttm の状態が数秒間続いた時は view() を実行
