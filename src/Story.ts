import Download from "./Download"

export default class Story extends Download{
    private _id!: number
    private stryURL!: string

    constructor(id: number) {
        super()
        this.id = id
    }

    set id(id: number) {
        this._id = id
        // set stryURL
        this.stryURL = this.HKN_STORY_URL + this.id + this.EXTENSION
    }

    get id(): number {
        return this._id
    }

    public async get(): Promise<any> {
        let response: any = await fetch(this.stryURL)
        let json: any = await response.json()
        return json
    }

    public fetch(): void {
        this.get().then(
            (response: any) => {
                console.log(response)
            }
        )
    }

    public writeHTML(): void {

    }
}