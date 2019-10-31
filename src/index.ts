import './scss/style.scss'

import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import { StoryData } from './HKNews'
import HTMLWriter from './HTMLWriter'

let tsCllctr = new TopStoryCollecter(30)
let hw = new HTMLWriter()

let f = async (): Promise<any> => {
    await tsCllctr.setStryInstnc()
    // console.log(tsCllctr.storyCollecter)
    let iterator: StoriesIterator = tsCllctr.iterator()

    while (iterator.hasNext()) {
        let ff = async () => {
            let sd: StoryData = await iterator.next()
            hw.write(sd)
        }
        ff()
    }
}
f()

let moreBtn: Element | null = document.getElementById('moreButton')
if (moreBtn !== null) {
    moreBtn.addEventListener('click', () => {
        alert('click')
    })
}