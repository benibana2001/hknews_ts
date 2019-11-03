import './scss/style.scss'
import Render from './Render'
import { isOnPageBttm } from './ts/Utility'

const renderer: Render = new Render()

// window.addEventListener('scroll', () => {
//     if (!renderer.isLocked) {
//         window.requestAnimationFrame(() => {
//             if (isOnPageBttm) renderer.initLoading()
//             console.log("UN-LOCK")
//             renderer.UnLockLoadTrigger()
//         })
//         console.log("LOCK")
//         renderer.lockLoadTrigger()
//     } else {
//         // console.log("ページ下部に到達。書き込み完了を待機. ( YOU CAME BOTOOM OF THE PAGE, BUT PLEASE WAIT SO THAT WRITING WILL FINISH SAFELY )")
//     }
// })

renderer.load()

// TODO: 最下部への到達が早いとスクロールイベントをキャッチできない
// よってOnPageBttm の状態が数秒間続いた時は view() を実行
