import Writer from "./InterfaceWriter";
import { StoryData } from "./HKNews";

export default class HTMLWriter implements Writer {
    public write(sd: StoryData): void {
        let view: Element | null = document.getElementById('view')
        if (view !== null) this.writeCard(view, sd)
    }

    private writeCard(parent: Element, sd: StoryData): void {
        // Create Card
        let card: Element = document.createElement('div')
        card.className = "card"
      
        // Set AnchorArea
        let anchorArea: Element = document.createElement('a')
        if (typeof sd.url === 'string') anchorArea.setAttribute("href", sd.url)

        // Add Score
        if (typeof sd.score === 'number') this.createDIV(anchorArea, 'score', String(sd.score))

        // Add Title
        if (typeof sd.title === 'string') this.createDIV(anchorArea, 'title', sd.title)

        // Append
        card.appendChild(anchorArea)
        parent.appendChild(card)
    }

    private createDIV(parent: Element, className: string | null, text: string | null): void {
        let div: Element = document.createElement('div')
        if(className !== null) div.className = className
        if(text !== null) div.textContent = text
        parent.appendChild(div)
    }

}