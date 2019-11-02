import DOMElement from "./DOMElement";

export default class DOMElementsEditor {
    constructor() { }

    public createElem(
        tag: string,
        parent: Element,
        classNameArr: string[] | null,
        url: string | null,
        text: string | null
    ): DOMElement {
        return new DOMElement(tag, parent, classNameArr, url, text)
    }
}