import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import Story from './Story'

let tsCllctr = new TopStoryCollecter()
let f = async (): Promise<any> => {
    await tsCllctr.setStryInstnc(10)
    console.log(tsCllctr.storyCollecter)
    let iterator: StoriesIterator = tsCllctr.iterator()

    while (iterator.hasNext()) {
        let s: Story = iterator.next()
        s.fetch()
    }
}
f()

/*
let e: Element = document.body
let eDiv: Element = document.createElement('div')
eDiv.textContent = "Hello World"
e.appendChild(eDiv)
*/