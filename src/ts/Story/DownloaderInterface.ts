export default interface Downloader {
    download(num: number): Promise<any>
}