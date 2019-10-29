import Writer from "./InterfaceWriter";

export default class HTMLWriter implements Writer {
    public write(txt: string): void {
        let e: Element = document.body
        let div: Element = document.createElement('div')

        div.textContent = txt
        e.appendChild(div)
    }
}