// HTMLWriterでしか使用しないので has-a関係としてHTMLWriterに持たせる
// TODO: create()メソッドを使用して インスタンスは一つ立てればよい構造にする
export default class DOMElementsEditor {
    public elem!: Element
    private parent!: Element

    constructor(tag: string | null, parent: Element, className: string[] | null, url: string | null, text: string | null) {
        if (tag !== null) {
            this.elem = document.createElement(tag)
        }
        if (parent !== null) {
            this.parent = parent
        }
        if (className !== null) {
            let newClassName: string = ""
            for (let i = 0; i < className.length; i++) {
                newClassName += (className[i] + " ")
            }
            this.elem.className = newClassName.substr(0, newClassName.length - 1)
        }
        if (url !== null) {
            this.elem.setAttribute("href", url)
        }
        if (text !== null) {
            this.elem.textContent = text
        }
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