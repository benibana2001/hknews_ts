import DOMElement from "./DOMElement";

export default class DOMElementsEditor {
    constructor() { }

    public createElem(
        tag: string,
        parent: Element,
        classNameArr: string[] | null,
        url: string | null | undefined,
        text: string | null | undefined,
        ariaLabel: string | null
    ): DOMElement {
        return new DOMElement(tag, parent, classNameArr, url, text, ariaLabel)
    }

    public createDiv(
        parent: Element,
        classNameArr: string[] | null,
        text: string | null | undefined,
    ) {
        return this.createElem('div', parent, classNameArr, null, text, null)
    }

    public createAnchor(
        parent: Element,
        classNameArr: string[] | null,
        url: string | null | undefined,
        text: string | null | undefined,
        ariaLabel: string | null
    ): DOMElement {
        return this.createElem('a', parent, classNameArr, url, text, ariaLabel)
    }

    public removeElem(parent: Element, elem: Element): void {
        parent.removeChild(elem)
    }
}