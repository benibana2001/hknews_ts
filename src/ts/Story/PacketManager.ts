import StoryCollecter from "./StoryCollecter"
import StoriesIterator from "./StoriesIterator"
import { StoryData } from "../HKNews"

export default class PacketManager {
    private stryCollector: StoryCollecter = new StoryCollecter(30)
    private iterator: StoriesIterator = this.stryCollector.iterator()
    private stryPacket: StoryData[] = []
    private queueAry: Promise<any>[] = []// queueのPromiseを格納
    public loadSinglePacket = async (): Promise<any> => {
        await this.stryCollector.init()// 初回のみ実行される
        while (this.iterator.hasNext()) {
            this.queueAry.push(this.queueNxtStry())
        }
        await this.doneFetchPacket()
    }
    // fetchをキュー
    private queueNxtStry = async (): Promise<any> => {
        // Rawデータを格納
        this.stryPacket.push(await this.iterator.next())
    }
    // SotryDataの全パケット受信完了を待機
    private doneFetchPacket = async (): Promise<any> => {
        await Promise.all(this.queueAry)
    }

    public getSinglePacket = (): StoryData[] => {
        return this.sortAryBbl(this.stryPacket)
    }

    public clearSinglePacket = (): void => {
        this.stryPacket = []
    }

    public setEachStry = (sd: StoryData): void => {
        this.stryPacket.push(sd)
    }

    // ************************************
    // *
    // ************************************
    private sortAryBbl(sdAry: StoryData[]): StoryData[] {
        for (let i = 0; i < sdAry.length; i++) {
            for (let j = sdAry.length - 1; i < j; j--) {
                if (this.rnkFrmSd(sdAry[j]) < this.rnkFrmSd(sdAry[j - 1])) {
                    let tmp: StoryData = sdAry[j]
                    sdAry[j] = sdAry[j - 1]
                    sdAry[j - 1] = tmp
                }
            }
        }
        return sdAry
    }

    private rnkFrmSd(sd: StoryData): number {
        if (typeof sd.rank === 'number') {
            return sd.rank
        } else {
            return 0
        }
    }
}