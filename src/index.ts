import './scss/style.scss'

import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import { StoryData } from './HKNews'
import { isOnPageBttm } from './Utility'
import HTMLWriter from './HTMLWriter'

let tsCllctr = new TopStoryCollecter(30)
let iterator: StoriesIterator = tsCllctr.iterator()
let hw = new HTMLWriter()
let stryAry: StoryData[] = []// StoryDataを複数格納する

// fetchをキュー
let queueNxtStry = async () => {
    // Rawデータを格納
    let sd: StoryData = await iterator.next()
    stryAry.push(sd)
}

let quereAry: Promise<any>[] = []// queueのPromiseを格納
let view = async (): Promise<any> => {
    // TODO: setStryInstnc()ではなくinit(), download()など 名前を知らなくて良い,もしくは実行内容の把握しやすい抽象的な名前になるようリファクタリングする
    await tsCllctr.init()
    while (iterator.hasNext()) {
        quereAry.push(queueNxtStry())
    }

    // スクロールローディングのLOCK開始
    lockLoadTrigger()
    sort()
}

let sort = async (): Promise<any> => {
    await Promise.all(quereAry)
    // console.log("sort実行")
    let sortedStryAry: StoryData[] = iterator.sortAryBbl(stryAry)
    console.log(sortedStryAry)
    for (let i = 0; i < sortedStryAry.length; i++) {
        console.log(`${i} を書き込み中( been writing ${i})`)
        await hw.write(sortedStryAry[i])
    }
    console.log("書き込み完了 ( finished writing )")
    // 一度配列を空にする
    stryAry = []
    // ロックを解除する
    UnLockLoadTrigger()
}

view()

// 通信、Card書き込み処理中はロック
let ticking: boolean = false
window.addEventListener('scroll', () => {
    let lastScrllY: number = window.scrollY
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // console.log(isOnPageBttm())
            if (isOnPageBttm()) view()
            ticking = false
        })
        ticking = true
    } else {
        console.log("ページ下部に到達。書き込み完了を待機. ( YOU CAME BOTOOM OF THE PAGE, BUT PLEASE WAIT SO THAT WRITING WILL FINISH SAFELY )")
    }
})

// TODO: 最下部への到達が早いとスクロールイベントをキャッチできない
// よってOnPageBttm の状態が数秒間続いた時は view() を実行

let lockLoadTrigger = (): void => {
    ticking = true
}
let UnLockLoadTrigger = (): void => {
    ticking = false
}