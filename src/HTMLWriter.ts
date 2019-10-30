import Writer from "./InterfaceWriter";

export default class HTMLWriter implements Writer {
    public write(parent: Element, txt: string): void {
        let div: Element = document.createElement('div')

        div.textContent = txt
        parent.appendChild(div)
    }
}