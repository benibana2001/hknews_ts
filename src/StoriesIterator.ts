import TopStoryCollecter from "./TopStoryCollecter"
import { StoryData } from "./HKNews"
import HTMLWriter from "./HTMLWriter"

export default class StoriesIterator {
    public index: number = 0
    public stryCllctr!: TopStoryCollecter
    private htmlWriter: HTMLWriter = new HTMLWriter()

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

        // 割り込み処理
        // StoryData にindex をRank として登録
        si.fetchCutIn(this.index)

        let sd: StoryData = await si.fetch()

        // 割り込み終了
        si.fetchCutOut()

        // 書き出し
        // this.htmlWriter.write(sd)
        return sd
        // console.log(sd)
    }

    public sortAryBbl(sdAry: StoryData[]): StoryData[] {
        for (let i = 0; i < sdAry.length; i++) {
            for (let j = sdAry.length - 1; i < j; j--) {
                if (this.rnkFrmSd(sdAry[j]) < this.rnkFrmSd(sdAry[j - 1])) {
                    let tmp: StoryData = sdAry[j]
                    sdAry[j] = sdAry[j - 1]
                    sdAry[j - 1] = tmp
                }
            }
        }
        return sdAry
    }

    private rnkFrmSd(sd: StoryData): number {
        if (typeof sd.rank === 'number') {
            return sd.rank
        } else {
            return 0
        }
    }

}