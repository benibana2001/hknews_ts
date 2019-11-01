import Story from './Story'
import { StoryData } from './HKNews'
import TopStories from './TopStoryIDs'
import StoriesIterator from './StoriesIterator'
export default class TopStoryCollecter {
    public storyCollecter: Story[] = []
    private topStoryIDs: number[] = []

    // instance length
    private sizeStoryBundle: number
    // a index of Story already instanciated
    private index: number

    constructor(num: number) {
        this.index = 0
        this.sizeStoryBundle = num
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

        // maxCntStryBundleの数だけインスタンスを作成して保持

        // todo: 二回目以降 ループに入らない
        let storyBundle: number[] = this.topStoryIDs.slice(this.index, this.index + this.sizeStoryBundle)
        console.log(`this.index:`, this.index)
        console.log(`this.sizeStoryBundle`, this.sizeStoryBundle)
        console.log(`storyBundle`, storyBundle.length)
        for (let i = this.index; i < storyBundle.length; i++) {
        // for (let i = this.index; i < this.index + this.sizeStoryBundle; i++) {
            // set instance
            this.appendStory(new Story(storyBundle[i]))
        }
    }

    public iterator(): StoriesIterator {
        return new StoriesIterator(this)
    }

    private async getTpStryIDs(): Promise<any> {
        // todo: Static関数で良さげ
        let ts: TopStories = new TopStories()
        let response: any = await ts.get()
        this.topStoryIDs = response
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