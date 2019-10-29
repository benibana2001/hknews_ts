import Story from "./Story"
import TopStoryCollecter from "./TopStoryCollecter"

export default class StoriesIterator {
    public index: number = 0
    public stryCllctr!: TopStoryCollecter

    constructor(stryCllctr: TopStoryCollecter) {
        this.stryCllctr = stryCllctr
    }

    public hasNext(): boolean {
        if (this.index < this.stryCllctr.getCllctrLength()) {
            return true
        } else {
            return false
        }
    }

    public next(): Story {
        let s = this.stryCllctr.getStoryAt(this.index)
        this.index++
        return s
    }
}