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
    // hw.write(sd)
}

let viewAry: Promise<any>[] = []

let view = async (): Promise<any> => {
    await tsCllctr.setStryInstnc()
    // console.log(tsCllctr.storyCollecter)
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
    // todo: Write
    for (let i = 0; i < sortedStryAry.length; i++) {
        hw.write(sortedStryAry[i])
    }
}

view()

/*
let parallel = async (): Promise<any> => {
    await Promise.all([
        view()
    ])
}

(async (): Promise<any> => {
    await parallel()
    console.log("All DONE")
})()
*/

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
/*
let moreBtn: Element | null = document.getElementById('moreButton')
if (moreBtn !== null) {
    moreBtn.addEventListener('click', () => {
        view()
    })
}
*/