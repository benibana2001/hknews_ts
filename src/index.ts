import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import Story from './Story'
import { StoryData } from './HKNews'
import HTMLWriter from './HTMLWriter'

let tsCllctr = new TopStoryCollecter()
let hw = new HTMLWriter()
let body: Element = document.body

let f = async (): Promise<any> => {
    await tsCllctr.setStryInstnc(10)
    console.log(tsCllctr.storyCollecter)
    let iterator: StoriesIterator = tsCllctr.iterator()

    while (iterator.hasNext()) {
        console.log("hello")
        iterator.next().then(
            (sd: StoryData) => {
                console.log(sd.title)
                hw.write(body, sd.title)
            }
        )
    }

}
f()

/*
let e: Element = document.body
let eDiv: Element = document.createElement('div')
eDiv.textContent = "Hello World"
e.appendChild(eDiv)
*/