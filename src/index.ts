import './scss/style.scss'

import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import { StoryData, isOnPageBttm } from './HKNews'
import HTMLWriter from './HTMLWriter'

let tsCllctr = new TopStoryCollecter(30)
let iterator: StoriesIterator = tsCllctr.iterator()
let hw = new HTMLWriter()
let stryAry: StoryData[] = []

let viewNext = async () => {
    let sd: StoryData = await iterator.next()
    stryAry.push(sd)
}

let viewAry: Promise<any>[] = []

let view = async (): Promise<any> => {
    // TODO: スクロールローディングのLOCK開始

    await tsCllctr.setStryInstnc()
    while (iterator.hasNext()) {
        viewAry.push(viewNext())
    }
    lockLoadTrigger()
    sort()
}

let sort = async (): Promise<any> => {
    await Promise.all(viewAry)
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
    // TODO:ロックを解除する
    UnLockLoadTrigger()
}

view()

// TODO: 通信、Card書き込み処理中はロック
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

let lockLoadTrigger = (): void => {
    ticking = true
}
let UnLockLoadTrigger = (): void => {
    ticking = false
}