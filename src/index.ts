import './scss/style.scss'

import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import { StoryData, isOnPageBttm } from './HKNews'
import HTMLWriter from './HTMLWriter'

let tsCllctr = new TopStoryCollecter(30)
let iterator: StoriesIterator = tsCllctr.iterator()
let hw = new HTMLWriter()

let viewNext = async () => {
    let sd: StoryData = await iterator.next()
    // hw.write(sd)
}
let view = async (): Promise<any> => {
    await tsCllctr.setStryInstnc()
    // console.log(tsCllctr.storyCollecter)
    while (iterator.hasNext()) {
        viewNext()
    }
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
/*
let moreBtn: Element | null = document.getElementById('moreButton')
if (moreBtn !== null) {
    moreBtn.addEventListener('click', () => {
        view()
    })
}
*/