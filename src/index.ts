import TopStoryCollecter from './TopStoryCollecter'
import StoriesIterator from './StoriesIterator'
import Story from './Story'
let tsCllctr = new TopStoryCollecter()

tsCllctr.setStryInstance(10).then(
    () => {
        console.log(tsCllctr.storyCollecter)
        let iterator: StoriesIterator = tsCllctr.iterator()
        
        while(iterator.hasNext()) {
            let s: Story = iterator.next()
            s.fetch()
        }
    }
)

/*
tsCllctr.getData().then(
    () => {
        console.log(tsCllctr.stories)
    }
)
*/
/*
let e: Element = document.body
let eDiv: Element = document.createElement('div')
eDiv.textContent = "Hello World"
e.appendChild(eDiv)
*/