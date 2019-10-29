import Story from './Story'
import { StoryData } from './HKNews'
import TopStories from './TopStoryIDs'
export default class TopStoryCollecter {
    private num: number = 0
    private topStoryIDs: number[] = []
    public stories: Story[] = []
    public top10Story: Story[] = []

    constructor(num: number) {
        this.num = num
    }

    public getTopStoryIDs(): Promise<any> {
        let get = (resolve: any, reject: any) => {
            let ts: TopStories = new TopStories()
            /*
            ts.get(this.num).then(
                (response: number[]) => {
                    console.log(response)
                    this.topStoryIDs = response
                    resolve()
                }
            )
            */
           ts.get().then(
               (responseJSON: number[]) => {
                   this.topStoryIDs = responseJSON
                   resolve()
               }
           )
        }
        return new Promise(get)
    }

    public setStryInstance(): Promise<any> {
        let f = (resolve: any, reject: any) => {
            this.getTopStoryIDs().then(
                () => {
                    // this.topStoryIds
                    let top10: number[] = (this.topStoryIDs as []).slice(0, 10)
                    for (let i = 0; i < top10.length; i++) {
                        // set instance
                        this.top10Story.push(new Story(top10[i]))
                    }
                    resolve()
                }
            )
        }
        return new Promise(f)
    }

    /*
    public getData(): Promise<any> {
        let f = (resolve: any, reject: any): any => {
            this.getTopStoryIDs().then(
                () => {
                    console.log(this.topStoryIDs)
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

    */

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