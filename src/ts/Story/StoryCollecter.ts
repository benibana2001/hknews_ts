import Story from './Story'
import TopStories from './TopStoryIDs'
import StoriesIterator from './StoriesIterator'
import { StoryData } from '../HKNews'
export default class StoryCollecter {
    public storyCollection: Story[] = []
    private allIDs: number[] = []
    private packetSize: number// a bunch of StoryData, which will be load by single request.
    private stryPacket: StoryData[] = []
    private index: number// a counter, which indicate a number of Stories instanciated

    constructor(num: number) {
        this.index = 0
        this.packetSize = num
    }

    // 初期化処理
    public async init(): Promise<any> {
        // 初回判定
        if (this.index === 0) {
            await this.getTpStryIDs()
        }
        this.setStoryInstance()
    }

    // インスタンスを作成して保持
    public setStoryInstance = (): void => {
        let DLoadList = this.makeDLoadIDList()
        for (let i = 0; i < DLoadList.length; i++) {
            this.appendStory(new Story(DLoadList[i]))
        }
    }

    // ダウンロード対象となるIDリストを作成
    private makeDLoadIDList = (): number[] => {
        return this.allIDs.slice(this.index, this.index + this.packetSize)
    }

    public iterator(): StoriesIterator {
        return new StoriesIterator(this)
    }

    private async getTpStryIDs(): Promise<any> {
        let ts: TopStories = new TopStories()
        let response: any = await ts.download()
        this.allIDs = response
    }

    public getSinglePacket = (): StoryData[] => {
        return this.sortAryBbl(this.stryPacket)
    }

    public clearSinglePacket = (): void => {
        this.stryPacket = []
    }

    public setEachStry = (sd: StoryData): void => {
        this.stryPacket.push(sd)
    }

    public getCllctrLength() {
        return this.storyCollection.length
    }

    public getStoryAt(index: number) {
        return this.storyCollection[index]
    }

    public appendStory(story: Story): void {
        this.storyCollection.push(story)
        this.index++
    }

    private sortAryBbl(sdAry: StoryData[]): StoryData[] {
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