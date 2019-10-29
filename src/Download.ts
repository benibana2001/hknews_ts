export default abstract class Download {
    protected readonly HKN_TOP_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    protected readonly HKN_STORY_URL = 'https://hacker-news.firebaseio.com/v0/item/'
    protected readonly EXTENSION = '.json?print=pretty'
    protected type: any = 'json'
    abstract get(num: number): Promise<any>
}