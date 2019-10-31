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
        **          - .score
        ****************************j
        */

        // debug
        let card: DOMCreator = new DOMCreator('div', parent, 'card', null, null)
        if (typeof sd.url === 'string' && typeof sd.title === 'string' && typeof sd.score === 'number') {
            let anchorArea: DOMCreator = new DOMCreator('a', card.elem, null, sd.url, null)
            let rank: DOMCreator = new DOMCreator('div', anchorArea.elem, 'rank', null, String(999))
            let title: DOMCreator = new DOMCreator('div', anchorArea.elem, 'title', null, sd.title)
            let score: DOMCreator = new DOMCreator('div', card.elem, 'score', null, String(sd.score))

            rank.add()
            title.add()
            anchorArea.add()
            score.add()
            card.add()
        }
        // **************************

        /*
        // Create Card
        let card: Element = document.createElement('div')
        card.className = "card"

        // Create AnchorArea
        let anchorArea: Element = document.createElement('a')
        if (typeof sd.url === 'string') anchorArea.setAttribute("href", sd.url)
        // if (typeof sd.url === 'string') this.createAnchor(card, null, sd.url)
        // Add Rank
        this.createDIV(anchorArea, 'rank', "999")
        // Add Title
        if (typeof sd.title === 'string') this.createDIV(anchorArea, 'title', sd.title)
        // Add Score
        if (typeof sd.score === 'number') this.createDIV(anchorArea, 'score', String(sd.score))

        // Append AnchorArea
        card.appendChild(anchorArea)
        // Append Card
        parent.appendChild(card)
        */
    }

    private createDIV(parent: Element, className: string | null, text: string | null): void {
        let div: Element = document.createElement('div')
        if (className !== null) div.className = className
        if (text !== null) div.textContent = text
        parent.appendChild(div)
    }
    /*
        private createAnchor(parent: Element, className: string | null, url: string | null): void {
            let a: Element = document.createElement('a')
            if (className !== null) a.className = className
            if (url !== null) a.setAttribute("href", url)
        }
    */
}