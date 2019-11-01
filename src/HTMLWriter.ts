import Writer from "./InterfaceWriter";
import { StoryData, DOMCreator } from "./HKNews";

export default class HTMLWriter implements Writer {
    private doneInit: boolean = false
    public write(sd: StoryData): void {
        this.init()
        let scroll: Element | null = document.getElementById('scroll')
        if (scroll !== null) this.writeCard(scroll, sd)
    }

    private init(): void {
        if (this.doneInit) return
        this.writeHeader()
    }

    private writeHeader(): void {
        let elemH1: Element | null = document.getElementById('h1-title')
        if (elemH1 !== null) elemH1.textContent = "HKNews App Iwase"
    }

    private writeCard(parent: Element, sd: StoryData): void {
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

        // todo: Ranking をWriteする
        // StoryCollector のみRanking(index)を知っている
        // HTMLWriteクラスはIteratorクラスに持たせて next()メソッドで実行させる
        // todo: Card追加はアニメーションがあるとわかりやすい
        let card: DOMCreator = new DOMCreator('div', parent, 'card', null, null)
        if (typeof sd.url === 'string' && typeof sd.title === 'string' && typeof sd.score === 'number') {
            let anchorArea: DOMCreator = new DOMCreator('a', card.elem, 'anchorArea', sd.url, null)
            let rank: DOMCreator = new DOMCreator('div', anchorArea.elem, 'rank', null, String(sd.rank))
            let title: DOMCreator = new DOMCreator('div', anchorArea.elem, 'title', null, sd.title)
            let score: DOMCreator = new DOMCreator('a', card.elem, 'score', null, null)
            let scoreSpan: DOMCreator = new DOMCreator('span', score.elem, 'scoreSpan', null, String(sd.score))

            rank.add()
            title.add()
            anchorArea.add()
            scoreSpan.add()
            score.add()
            card.add()
        }
    }

    private createDIV(parent: Element, className: string | null, text: string | null): void {
        let div: Element = document.createElement('div')
        if (className !== null) div.className = className
        if (text !== null) div.textContent = text
        parent.appendChild(div)
    }
}