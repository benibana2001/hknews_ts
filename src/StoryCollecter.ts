import Story from './Story'
import TopStories from './TopStoryIDs'
import StoriesIterator from './StoriesIterator'
export default class StoryCollecter {
    public storyCollection: Story[] = []
    private allIDs: number[] = []
    private packetSize: number// a bunch of StoryData, which will be load by single request.
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
        let response: any = await ts.get()
        this.allIDs = response
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
}