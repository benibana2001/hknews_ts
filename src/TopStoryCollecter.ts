import Story from './Story'
import { StoryData } from './HKNews'
import TopStories from './TopStoryIDs'
export default class TopStoryCollecter {
    private maxCntStryBundle: number = 10
    private topStoryIDs: number[] = []
    public storyBundle: Story[] = []

    constructor() {}

    private getTopStoryIDs(): Promise<any> {
        let get = (resolve: any, reject: any) => {
            let ts: TopStories = new TopStories()
            ts.get().then(
                (responseJSON: number[]) => {
                    this.topStoryIDs = responseJSON
                    resolve()
                }
            )
        }
        return new Promise(get)
    }

    public setStryInstance(num: number): Promise<any> {
        this.maxCntStryBundle = num
        let f = (resolve: any, reject: any) => {
            this.getTopStoryIDs().then(
                () => {
                    // this.topStoryIds
                    let top10: number[] = (this.topStoryIDs as []).slice(0, 10)
                    for (let i = 0; i < top10.length; i++) {
                        // set instance
                        this.storyBundle.push(new Story(top10[i]))
                    }
                    resolve()
                }
            )
        }
        return new Promise(f)
    }

    /*
    public appendStory(story: Story): void {
        this.stories.push(story)
    }

    public getStoryAt(index: number): Story {
        return this.stories[index]
    }

    public getLength(): number {
        return this.stories.length
    }

    public iterator(): StoriesIterator {
        return new StoriesIterator(this)
    }
    */
}