import Story from './Story'
import { StoryData } from './HKNews'
import TopStories from './TopStoryIDs'
import StoriesIterator from './StoriesIterator'
export default class TopStoryCollecter {
    public storyCollecter: Story[] = []
    private allIDs: number[] = []
    // instance length
    private bundleIDLength: number
    // a index of Story already instanciated
    private index: number

    constructor(num: number) {
        this.index = 0
        this.bundleIDLength = num
    }

    // 初期化処理
    public async init(): Promise<any> {
        // TopStoryのIDを500件取得して保持
        await this.getTpStryIDs()
    }

    // Storyインスタンスを追加
    public async setStryInstnc(): Promise<any> {
        // 初期化判定
        if (this.index === 0) {
            await this.getTpStryIDs()
        }

        let eachBundleIDs: number[] = this.allIDs.slice(this.index, this.index + this.bundleIDLength)
        // インスタンスを作成して保持
        for (let i = 0; i < eachBundleIDs.length; i++) {
            this.appendStory(new Story(eachBundleIDs[i]))// set instance
        }
    }

    public iterator(): StoriesIterator {
        return new StoriesIterator(this)
    }

    private async getTpStryIDs(): Promise<any> {
        // TODO: Static関数で良さげ
        let ts: TopStories = new TopStories()
        let response: any = await ts.get()
        this.allIDs = response
    }

    public getCllctrLength() {
        return this.storyCollecter.length
    }

    public getStoryAt(index: number) {
        return this.storyCollecter[index]
    }

    public appendStory(story: Story): void {
        this.storyCollecter.push(story)
        this.index++
    }
}