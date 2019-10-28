import Stories from './Stories'
let stories = new Stories(50)
stories.getData().then(
    () => {
        console.log(stories.stories)
    }
)

