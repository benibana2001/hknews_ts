import Story from './Story'
import { StoryData } from './HKNews'
import TopStories from './TopStoryIDs'
import StoriesIterator from './StoriesIterator'
export default class TopStoryCollecter {
    private maxCntStryBundle: number = 10
    private topStoryIDs: number[] = []
    public storyCollecter: Story[] = []

    constructor() {}

    public getCllctrLength() {
        return this.storyCollecter.length
    }

    public getStoryAt(index: number) {
        return this.storyCollecter[index]
    }

    private async getTpStryIDs(): Promise<any> {
        // todo: Static関数で良さげ
        let ts: TopStories = new TopStories()
        let response: any = await ts.get()
        this.topStoryIDs = response
    }

    public iterator(): StoriesIterator {
        return new StoriesIterator(this)
    }

    // TopStoryのJSON配列を追加
    // Storyインスタンスを追加
    public async setStryInstnc(num: number): Promise<any> {
        this.maxCntStryBundle = num

        // TopStoryのIDを500件取得して保持
        await this.getTpStryIDs()

        // maxCntStryBundleの数だけインスタンスを作成して保持
        let top10: number[] = (this.topStoryIDs as []).slice(0, this.maxCntStryBundle)
        for(let i = 0; i < top10.length; i++) {
            // set instance
            this.storyCollecter.push(new Story(top10[i]))
        }
    }

    /*
    public appendStory(story: Story): void {
        this.stories.push(story)
    }
 */
}