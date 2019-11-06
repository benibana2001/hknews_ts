import './scss/style.scss'
import Render from './Render'
import PacketManager from './ts/Story/PacketManager'
import { reachedPageBttmFrom } from './ts/Utility'
import { StoryData } from './ts/HKNews'

const renderer: Render = new Render()
const packetManager: PacketManager = new PacketManager()

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

// TODO: エラー投げて処理した方が読みやすい?
// ロードは何回もキューが入るので データロード中に入ったキューはキャンセルする
let load = async (): Promise<boolean> => {
    // ロード済みか確認
    if (packetManager.isReadablePacket()) {
        console.log("1: 成功 すでにデータあり")
        return true// 成功
    } else {
        // ロード中か確認
        if (packetManager.isLoading === true) {
            console.log("3: 中断 データロード中")
            return false// 失敗 loadはキャンセルされる
        } else {
            await packetManager.loadSinglePacket()
            console.log("4: 成功 データ取得完了")
            isLoaded = true
            return true// 成功
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

// let avoidLock = () => {
//     if(reachedPageBttmFrom(0.99)) {
//         render()
//     }
//     setTimeout(avoidLock, 500)
// }
// avoidLock()
