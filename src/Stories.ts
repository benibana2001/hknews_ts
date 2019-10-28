import Story from './Story'
import { StoryData } from './HKNews'
export default class Stories {
    private num: number = 0
    private ids: number[] = []
    public stories: Story[] = []

    constructor(num: number) {
        this.num = num
    }

    public getData(): Promise<any> {
        let f = (resolve: any, reject: any): any => {
            let s: Story = new Story()
            s.getTop(this.num).then(
                (val: number[]) => {
                    console.log(val)
                    this.ids = val
                    return s.getStry(val[0])
                }
            ).then(
                (val: StoryData) => {
                    console.log(val)
                    // 一時的にプロミスを保存
                    let strPrmss: Promise<any>[] = []
                    for (let i = 0; i < this.ids.length; i++) {
                        let s: Story = new Story()
                        strPrmss.push(s.getStry(this.ids[i]))
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