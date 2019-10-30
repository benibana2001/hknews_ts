export default abstract class Download {
    abstract get(num: number): Promise<any>
}