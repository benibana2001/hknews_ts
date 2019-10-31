import Writer from "./InterfaceWriter";
import { StoryData, DOMCreator } from "./HKNews";

export default class HTMLWriter implements Writer {
    public write(sd: StoryData): void {
        let view: Element | null = document.getElementById('view')
        if (view !== null) this.writeCard(view, sd)
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
        let card: DOMCreator = new DOMCreator('div', parent, 'card', null, null)
        if (typeof sd.url === 'string' && typeof sd.title === 'string' && typeof sd.score === 'number') {
            let anchorArea: DOMCreator = new DOMCreator('a', card.elem, 'anchorArea', sd.url, null)
            let rank: DOMCreator = new DOMCreator('div', anchorArea.elem, 'rank', null, String(999))
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