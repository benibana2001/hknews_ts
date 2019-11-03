import './scss/style.scss'

import StoryCollecter from './StoryCollecter'
import StoriesIterator from './StoriesIterator'
import { StoryData } from './HKNews'
import { isOnPageBttm } from './Utility'
import HTMLWriter from './HTMLWriter'

let stryCollector = new StoryCollecter(30)
let iterator: StoriesIterator = stryCollector.iterator()
let hw = new HTMLWriter()
let stryPacket: StoryData[] = []// StoryDataを指定個数だけ格納する, 上書きされる

// fetchをキュー
let queueNxtStry = async () => {
    // Rawデータを格納
    let sd: StoryData = await iterator.next()
    stryPacket.push(sd)
}

let quereAry: Promise<any>[] = []// queueのPromiseを格納
// StoryData取得・描画の基準点
let initLoading = async (): Promise<any> => {
    await stryCollector.init()
    while (iterator.hasNext()) {
        quereAry.push(queueNxtStry())
    }

    // スクロールローディングのLOCK開始
    lockLoadTrigger()
    render()
}

// SotryDataの全パケット受信完了を待機
let doneFetchPacket = async (): Promise<any> => {
    await Promise.all(quereAry)
}

let render = async (): Promise<any> => {
    await doneFetchPacket()

    // 並び替え実行
    let sortedStryAry: StoryData[] = iterator.sortAryBbl(stryPacket)
    console.log(sortedStryAry)
    // 全件書き出し
    for (let i = 0; i < sortedStryAry.length; i++) {
        console.log(`${i} を書き込み中( been writing ${i})`)
        await hw.write(sortedStryAry[i])
    }
    console.log("書き込み完了 ( finished writing )")
    // パケットを空にする
    stryPacket = []
    // ロックを解除する
    UnLockLoadTrigger()
}

initLoading()

// 通信、Card書き込み処理中はロック
let ticking: boolean = false
let lockLoadTrigger = (): void => {
    ticking = true
}
let UnLockLoadTrigger = (): void => {
    ticking = false
}

window.addEventListener('scroll', () => {
    let lastScrllY: number = window.scrollY
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // console.log(isOnPageBttm())
            if (isOnPageBttm()) initLoading()
            ticking = false
        })
        ticking = true
    } else {
        console.log("ページ下部に到達。書き込み完了を待機. ( YOU CAME BOTOOM OF THE PAGE, BUT PLEASE WAIT SO THAT WRITING WILL FINISH SAFELY )")
    }
})

// TODO: 最下部への到達が早いとスクロールイベントをキャッチできない
// よってOnPageBttm の状態が数秒間続いた時は view() を実行
