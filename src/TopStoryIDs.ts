import Download from "./Download";

export default class TopStories extends Download {
    public async get(): Promise<any> {
        let response = await fetch(this.HKN_TOP_URL)
        let json = response.json()
        return json
    }

}