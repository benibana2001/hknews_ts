export default class DOMElement {
    public elem!: Element
    private parent!: Element

    constructor(
        tag: string,
        parent: Element,
        classNameArr: string[] | null,
        url: string | null | undefined,
        text: string | null | undefined
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

    private setURL(url: string | null | undefined): void {
        if(typeof url !== 'string') return
        this.elem.setAttribute("href", url)
    }

    private setText(text: string | null | undefined): void {
        if(typeof text !== 'string') return
        this.elem.textContent = text
    }

    private setClassName(clsAry: string[] | null): void {
        if (clsAry === null) return
        if (clsAry.length < 1) return

        let newClassName: string = ""
        for (let i = 0; i < clsAry.length; i++) {
            newClassName += (clsAry[i] + " ")
        }
        this.elem.className = newClassName.substr(0, newClassName.length - 1)
    }

    public add(): void {
        this.parent.appendChild(this.elem)
    }

    // フェード用クラス
    public async addClass(className: string): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.elem.classList.add(className)
                resolve()
            }, 50);
        })
    }
}