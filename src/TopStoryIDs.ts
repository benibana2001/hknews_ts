import Download from "./Download";
import { URL } from "./HKNews"

export default class TopStories extends Download{
        public async get(): Promise<any> {
        let response = await fetch(URL.HKN_TOP_URL)
        let json = response.json()
        return json
    }

}