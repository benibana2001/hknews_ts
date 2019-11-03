import './scss/style.scss'
import Render from './Render'
import { isOnPageBttm } from './ts/Utility'

const renderer: Render = new Render()


window.addEventListener('scroll', () => {
    console.log("scroll感知")
    if (renderer.isLocked === false) {
        window.requestAnimationFrame((): void => {
            if (isOnPageBttm()) {
                // スクロールローディングのロックをしてload開始
                console.log("最下部到達 ロックします。")
                renderer.lockLoadTrigger()
                renderer.load()
            }
        })
    }
})

renderer.load()

// TODO: 最下部への到達が早いとスクロールイベントをキャッチできない
// よってOnPageBttm の状態が数秒間続いた時は view() を実行
