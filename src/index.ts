import './scss/style.scss'
import Render from './Render'
import { isOnPageBttm, isOverPage60per } from './ts/Utility'

const renderer: Render = new Render()


window.addEventListener('scroll', () => {
    console.log("scroll感知")

    // ロック解除時
    if (renderer.isLockedLoading === false) {
        window.requestAnimationFrame((): void => {
            if (isOverPage60per) {
                console.log("60%到達 ロード実行 ロックします。")
                renderer.lockLoading()
            }
        })
    } else {// ロック時
        window.requestAnimationFrame(() => {
            if (!isOverPage60per) {
                console.log("60%未満 ロード ロック解除します。")
                renderer.unLockLoading()
            }
        })
    }

    if (renderer.isLockedRendering === false) {
        window.requestAnimationFrame((): void => {
            if (isOnPageBttm()) {
                // スクロールローディングのロックをしてload開始
                console.log("最下部到達 レンダー実行 ロックします。")
                renderer.lockRendering()
                renderer.load()
            }
        })
    }
})

renderer.load()

// TODO: 最下部への到達が早いとスクロールイベントをキャッチできない
// よってOnPageBttm の状態が数秒間続いた時は view() を実行
