export { StoryData }

function deferFunc(f: Function, t: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            f()
            resolve(`${f} was occured`)
        }, t)
    })
}

interface StoryData {
    by?: string,
    descendant?: number[],
    id: number,
    kids?: any,
    score?: number,
    time?: number,
    title?: string,
    type?: string,
    url?: string
}

