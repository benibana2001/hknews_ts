import { URL } from "../HKNews"
import Downloader from "./DownloaderInterface";

export default class TopStories implements Downloader {
    public async download(): Promise<any> {
        let response = await fetch(URL.HKN_TOP_URL)
        let json = response.json()
        return json
    }
}