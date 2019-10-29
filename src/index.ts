import Stories from './Stories'
let stories = new Stories(10)
stories.getData().then(
    () => {
        console.log(stories.stories)
    }
)

let e: Element = document.body
let eDiv: Element = document.createElement('div')
eDiv.textContent = "Hello World"
e.appendChild(eDiv)