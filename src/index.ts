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
    await tsCllctr.setStryInstnc()
    while (iterator.hasNext()) {
        viewAry.push(viewNext())
    }
    sort()
}

let sort = async (): Promise<any> => {
    await Promise.all(viewAry)
    // console.log("sort実行")
    let sortedStryAry: StoryData[] = iterator.sortAryBbl(stryAry)
    console.log(sortedStryAry)
    for (let i = 0; i < sortedStryAry.length; i++) {
        hw.write(sortedStryAry[i])
    }
    // 一度配列を空にする
    stryAry = []
}

view()

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
    }
})
