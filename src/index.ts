import TopStoryCollecter from './TopStoryCollecter'
let tsCllctr = new TopStoryCollecter(10)

tsCllctr.setStryInstance().then(
    () => {
        console.log(tsCllctr.top10Story)
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