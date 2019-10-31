import Story from './Story'
import { StoryData } from './HKNews'
import TopStories from './TopStoryIDs'
import StoriesIterator from './StoriesIterator'
export default class TopStoryCollecter {
    private maxCntStryBundle: number = 10
    private topStoryIDs: number[] = []
    public storyCollecter: Story[] = []

    // a index of Story already instanciated
    private index: number

    constructor(num: number) {
        this.index = 0
        this.maxCntStryBundle = num
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
        let top10: number[] = this.topStoryIDs.slice(this.index, this.maxCntStryBundle)
        for (let i = 0; i < top10.length; i++) {
            // set instance
            this.appendStory(new Story(top10[i]))
        }
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

    public iterator(): StoriesIterator {
        return new StoriesIterator(this)
    }

    public appendStory(story: Story): void {
        this.storyCollecter.push(story)
        this.index++
    }
}