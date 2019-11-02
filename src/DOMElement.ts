export default class DOMElement {
    public elem!: Element
    private parent!: Element

    constructor(
        tag: string,
        parent: Element,
        classNameArr: string[],
        url: string,
        text: string
    ) {
        this.elem = document.createElement(tag)
        this.setParent(parent)
        this.setClassName(classNameArr)
        this.setURL(url)
        this.setText(text)
    }

    private setParent(parent: Element): void {
        this.parent = parent
    }

    private setURL(url: string): void {
        this.elem.setAttribute("href", url)
    }

    private setText(text: string): void {
        this.elem.textContent = text
    }

    // インスタンスにクラスを付与する
    private setClassName(clsAry: string[]): void {
        if (clsAry.length < 1) return

        let newClassName: string = ""
        for (let i = 0; i < clsAry.length; i++) {
            newClassName += (clsAry[i] + " ")
        }

        this.elem.className = newClassName.substr(0, newClassName.length - 1)
    }
}