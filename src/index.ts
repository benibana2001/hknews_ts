import TopStoryCollecter from './TopStoryCollecter'
let tsCllctr = new TopStoryCollecter()

tsCllctr.setStryInstance(10).then(
    () => {
        console.log(tsCllctr.storyBundle)
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