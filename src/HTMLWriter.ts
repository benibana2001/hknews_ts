import Writer from "./InterfaceWriter";
import { StoryData } from "./HKNews";
import DOMElementsEditor from "./DOMElementsEditor";

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

        // TODO: url がない場合がある
        let card: DOMElementsEditor = new DOMElementsEditor('div', parent, ['card', 'out-view'], null, null)
        if (typeof sd.url === 'string' && typeof sd.title === 'string' && typeof sd.score === 'number') {
            let anchorArea: DOMElementsEditor = new DOMElementsEditor('a', card.elem, ['anchorArea'], sd.url, null)
            let rank: DOMElementsEditor = new DOMElementsEditor('div', anchorArea.elem, ['rank'], null, String(sd.rank))
            let title: DOMElementsEditor = new DOMElementsEditor('div', anchorArea.elem, ['title'], null, sd.title)
            let score: DOMElementsEditor = new DOMElementsEditor('a', card.elem, ['score'], null, null)
            let scoreSpan: DOMElementsEditor = new DOMElementsEditor('span', score.elem, ['scoreSpan'], null, String(sd.score))
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
}