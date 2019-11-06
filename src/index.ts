import './scss/style.scss'
import Render from './Render'
import PacketManager from './ts/Story/PacketManager'
import { isOnPageBttm, isOverPage60per } from './ts/Utility'
import { StoryData } from './ts/HKNews'

const renderer: Render = new Render()
const packetManager: PacketManager = new PacketManager()


window.addEventListener('scroll', () => {
    // ロック解除時
    if (renderer.isLockedLoading === false) {
        window.requestAnimationFrame((): void => {
            if (isOverPage60per()) {
                console.log("60%到達 ロード実行 ロックします。")
                renderer.lockLoading()
            }
        })
    } else {// ロック時
        window.requestAnimationFrame(() => {
            if (!isOverPage60per()) {
                console.log("60%未満 ロード ロック解除します。")
                renderer.unLockLoading()
            } else {
                console.log("60%を超えています")
            }
        })
    }

    if (renderer.isLockedRendering === false) {
        window.requestAnimationFrame((): void => {
            if (isOnPageBttm()) {
                // スクロールローディングのロックをしてload開始
                console.log("最下部到達 レンダー実行 ロックします。")
                renderer.lockRendering()
                render()
            }
        })
    }
})

let checkLoadingStatus = async (): Promise<any> => {
    if (!packetManager.isReadablePacket()) {
        console.log("データがありません")
        // すでにPacket取得中である場合は待機
        if (packetManager.isLoading) {
            console.log("ローディング中")
        } else {
            await packetManager.loadSinglePacket()
        }
    }
}

let render = async (): Promise<any> => {
    await checkLoadingStatus()
    let singlePacket: StoryData[] = packetManager.getSinglePacket()
    await renderer.render(singlePacket)
    packetManager.afterRendering()
}

render()

// TODO: 最下部への到達が早いとスクロールイベントをキャッチできない
// よってOnPageBttm の状態が数秒間続いた時は view() を実行
