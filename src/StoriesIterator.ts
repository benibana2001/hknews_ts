/*
import Stories from "./Stories"
import Story from "./Story"

export default class StoriesIterator {
    public index: number = 0
    public stories: Stories = new Stories

    constructor(s: Stories) {
        this.stories = s
    }

    public hasNext(): boolean {
        if (this.index < this.stories.getLength()) {
            return true
        } else {
            return false
        }
    }

    public next(): Story {
        let s = this.stories.getStoryAt(this.index)
        this.index++
        return s
    }
}
*/