import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import Story from './Story'
import { StoryData } from './HKNews'

let tsCllctr = new TopStoryCollecter()
let f = async (): Promise<any> => {
    await tsCllctr.setStryInstnc(10)
    console.log(tsCllctr.storyCollecter)
    let iterator: StoriesIterator = tsCllctr.iterator()

    while (iterator.hasNext()) {
        // let func = async (): Promise<any> => {
            // let sd: StoryData = await iterator.next()
            // console.log(sd)
        // }
        // func()
        console.log("hello")
        let sd = iterator.next()
        console.log(sd)
    }
}
f()

/*
let e: Element = document.body
let eDiv: Element = document.createElement('div')
eDiv.textContent = "Hello World"
e.appendChild(eDiv)
*/