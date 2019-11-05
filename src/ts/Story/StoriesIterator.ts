import StoryCollecter from "./StoryCollecter"
import { StoryData } from "../HKNews"
import HTMLWriter from "../Writer/HTMLWriter"

export default class StoriesIterator {
    public index: number = 0
    public stryCllctr!: StoryCollecter

    constructor(stryCllctr: StoryCollecter) {
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

        // 割り込み処理
        // StoryData にindex をRank として登録
        si.fetchCutIn(this.index)

        let sd: StoryData = await si.fetch()

        // 割り込み終了
        si.fetchCutOut()
        
        return sd
        // console.log(sd)
    }

}