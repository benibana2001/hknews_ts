import { StoryData } from "./HKNews";

export default interface Writer {
    write(sd: StoryData): void
}