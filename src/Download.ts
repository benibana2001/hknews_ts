export default abstract class Download {
    protected type: any = 'json'
    abstract get(num: number): Promise<any>
}