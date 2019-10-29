import Download from "./Download";

export default class TopStories extends Download{
    public async get(): Promise<any> {
        return fetch(this.HKN_TOP_URL).then(
            function(response){
                return response.json()
            }
        )
    }
}