import Story from './Story'
import { StoryData } from './HKNews'
import TopStories from './TopStoryIDs'
export default class TopStoryCollecter {
    private num: number = 0
    private topStoryIDs: number[] = []
    public stories: Story[] = []

    constructor(num: number) {
        this.num = num
    }

    public getTopStoryIDs(): Promise<any> {
        let get = (resolve: any, reject: any) => {
            let ts: TopStories = new TopStories()
            ts.get(this.num).then(
                (response: number[]) => {
                    console.log(response)
                    this.topStoryIDs = response
                    resolve()
                }
            )
        }
        return new Promise(get)
    }

    public getData(): Promise<any> {
        let f = (resolve: any, reject: any): any => {
            let ts: TopStories = new TopStories()
            this.getTopStoryIDs().then(
                () => {
                    // 一時的にプロミスを保存
                    let strPrmss: Promise<any>[] = []
                    for (let i = 0; i < this.topStoryIDs.length; i++) {
                        let s: Story = new Story()
                        strPrmss.push(s.get(this.topStoryIDs[i]))
                    }

                    Promise.all(strPrmss).then(
                        (values) => {
                            this.stories = values
                            resolve()
                        }
                    )
                }
            )
        }
        return new Promise(f)
    }

    public appendStory(story: Story): void {
        this.stories.push(story)
    }

    public getStoryAt(index: number): Story {
        return this.stories[index]
    }

    public getLength(): number {
        return this.stories.length
    }

    /*
    public iterator(): StoriesIterator {
        return new StoriesIterator(this)
    }
    */
}