import Writer from "./InterfaceWriter";
import { StoryData } from "./HKNews";

export default class HTMLWriter implements Writer {
    public write(sd: StoryData): void {
        let body: Element = document.body
        this.writeCard(body, sd)
    }

    private writeCard(parent: Element, sd: StoryData): void {
        let card: Element = document.createElement('div')
        let title: Element = document.createElement('a')

        card.className = "card"
        title.className = "title"
        
        // Add Score
        if (typeof sd.score === 'number') this.createDIV(card, 'score', String(sd.score))

        // Add Title
        title.textContent = (typeof sd.title === 'string') ? sd.title : ""
        if (typeof sd.url === 'string') title.setAttribute("href", sd.url)
        card.appendChild(title)

        // Append
        parent.appendChild(card)
    }

    private createDIV(parent: Element, className: string, text: string): void {
        let div: Element = document.createElement('div')
        div.className = className
        div.textContent = text
        parent.appendChild(div)
    }

}