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
        fetch(this.stryURL).then(
            function (response) {
                console.log(response.json)
                return response.json()
            }
        )
    }

    public fetch(): void {
        console.log(this.stryURL)
        this.get().then(
            (response: any) => {
                // todo: get()よりも先に走ってしまう
                // getのasyncを確認
                console.log(response)
            }
        )
    }

    public writeHTML(): void {

    }
}