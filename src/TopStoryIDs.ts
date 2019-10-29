import Download from "./Download";

export default class TopStories extends Download{
    /*
    public get(top: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.rqst.open("GET", this.HKN_TOP_URL)
            this.rqst.onload = () => {
                // 返り値をAny型で処理
                let response: any = this.rqst.response
                resolve(response.slice(0, top))
            }
            this.rqst.send(null)
        })
    }
    */
    public async get(): Promise<any> {
        return fetch(this.HKN_TOP_URL).then(
            function(response){
                return response.json()
            }
        )
    }
}