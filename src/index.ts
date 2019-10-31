import './scss/style.scss'

import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import { StoryData } from './HKNews'
import HTMLWriter from './HTMLWriter'

let tsCllctr = new TopStoryCollecter(30)
let iterator: StoriesIterator = tsCllctr.iterator()
let hw = new HTMLWriter()

let viewNext = async () => {
    let sd: StoryData = await iterator.next()
    hw.write(sd)
}
let view = async (): Promise<any> => {
    await tsCllctr.setStryInstnc()
    // console.log(tsCllctr.storyCollecter)
    while (iterator.hasNext()) {
        viewNext()
    }
}

view()

let moreBtn: Element | null = document.getElementById('moreButton')
if (moreBtn !== null) {
    moreBtn.addEventListener('click', () => {
        view()
    })
}