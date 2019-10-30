import Story from "./Story"
import TopStoryCollecter from "./TopStoryCollecter"
import { StoryData } from "./HKNews"

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

    public async next(): Promise<any> {
        let si = this.stryCllctr.getStoryAt(this.index)
        this.index++

        let sd: StoryData = await si.fetch()
        return sd
        // console.log(sd)
    }
}