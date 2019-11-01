import Writer from "./InterfaceWriter";
import { StoryData, DOMCreator } from "./HKNews";

export default class HTMLWriter implements Writer {
    private doneInit: boolean = false
    public async write(sd: StoryData): Promise<any> {
        this.init()
        let scroll: Element | null = document.getElementById('scroll')
        if (scroll !== null) await this.writeCard(scroll, sd)
    }

    private addClass(elem: Element, className: string): void {

    }

    private init(): void {
        if (this.doneInit) return
        this.writeHeader()
    }

    private writeHeader(): void {
        let elemH1: Element | null = document.getElementById('h1-title')
        if (elemH1 !== null) elemH1.textContent = "HKNews App Iwase"
    }

    private async writeCard(parent: Element, sd: StoryData): Promise<any> {
        /*
        ** *************************
        ** Structure of HTML
        ** *************************
        ** #view
        **  - .Card
        **      - a.Anchor Area
        **          - .rank
        **          - .title
        **          - a.score
        **              - span
        ****************************j
        */

        // todo: url がない場合がある
        let card: DOMCreator = new DOMCreator('div', parent, ['card', 'out-view'], null, null)
        if (typeof sd.url === 'string' && typeof sd.title === 'string' && typeof sd.score === 'number') {
            let anchorArea: DOMCreator = new DOMCreator('a', card.elem, ['anchorArea'], sd.url, null)
            let rank: DOMCreator = new DOMCreator('div', anchorArea.elem, ['rank'], null, String(sd.rank))
            let title: DOMCreator = new DOMCreator('div', anchorArea.elem, ['title'], null, sd.title)
            let score: DOMCreator = new DOMCreator('a', card.elem, ['score'], null, null)
            let scoreSpan: DOMCreator = new DOMCreator('span', score.elem, ['scoreSpan'], null, String(sd.score))
            rank.add()
            title.add()
            anchorArea.add()
            scoreSpan.add()
            score.add()
            card.add()
            await card.addClass('in-view')
        }else {
            console.log("ELSE")
        }
    }

    private createDIV(parent: Element, classNameAry: string[] | null, text: string | null): void {
        let div: Element = document.createElement('div')
        if (classNameAry !== null) {
            for(let i = 0; i < classNameAry.length; i++) {
                div.className = classNameAry[i]
            }
        }
        if (text !== null) div.textContent = text
        parent.appendChild(div)
    }
}