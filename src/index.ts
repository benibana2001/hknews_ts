import './scss/style.scss'
import Render from './Render'
import PacketManager from './ts/Story/PacketManager'
import { reachedPageBttmFrom } from './ts/Utility'
import { StoryData } from './ts/HKNews'

const renderer: Render = new Render()
const packetManager: PacketManager = new PacketManager()

// TODO: 90%未満の時(いや、スクロール時は常に) パケットが受信されているか常にチェック実行
window.addEventListener('scroll', () => {
    // ロック解除時
    if (renderer.isLockedLoading === false) {
        window.requestAnimationFrame(async(): Promise<any> => {
            if (reachedPageBttmFrom(0.6)) {
                console.log("60%到達 ロード実行 ロックします。")
                renderer.lockLoading()
                await checkLoadingStatus()
                console.log("ロード完了")
            }
        })
    } else {// ロック時
        window.requestAnimationFrame(() => {
            if (!reachedPageBttmFrom(0.6)) {
                console.log("60%未満 ロード ロック解除します。")
                renderer.unLockLoading()
            } else {
                console.log("60%を超えています")
            }
        })
    }

    if (renderer.isLockedRendering === false) {
        window.requestAnimationFrame((): void => {
            if (reachedPageBttmFrom(0.9)) {
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
