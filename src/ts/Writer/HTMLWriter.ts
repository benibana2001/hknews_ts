import Writer from "./WriterInterface";
import { StoryData } from "../HKNews";
import DOMElementsEditor from "./DOMElementsEditor";
import DOMElement from "./DOMElement";
import { URL } from "../HKNews"

export default class HTMLWriter implements Writer {
    private doneInit: boolean = false
    private domElementsEditor: DOMElementsEditor = new DOMElementsEditor()

    public async write(sd: StoryData): Promise<any> {
        this.init()
        let scroll: Element | null = document.getElementById('scroll')
        if (scroll !== null) await this.writeCard(scroll, sd)
    }

    private init(): void {
        if (this.doneInit) return
        this.writeHeader()
    }

    private writeHeader(): void {
        let elemH1: Element | null = document.getElementById('h1-title')
        if (elemH1 !== null) elemH1.textContent = "HKNews App Iwase"
    }

    // TODO: 削除用途にIDを付与できるようにする
    private addLoadingIcon(parent: Element) {
        let card: DOMElement = this.domElementsEditor.createDiv(parent, ['card'], 'Loading...')
    }

    private removeLoadingIcon(parent: Element) {

    }

    private async writeCard(parent: Element, sd: StoryData): Promise<any> {
        /*
        ** *************************
        ** Structure of HTML
        ** *************************
        ** #view
        **  - .Card
        **      - a.Anchor Area
        **          - .rank
        **          - .Story
        **              - .title
        **              - .metadata
        **                  - .link-text
        **                  - span.inline-block(points)
        **                  - span.inline-block(by)
        **                  - span.inline-block(unixTime, comment(length of kids))
        **              - .title
        **          - a.score
        **              - span
        ****************************j
        */

        let isCard: boolean = false
        let isStoryCard: boolean = false
        let isCommentCard: boolean = false
        let applyCardType = (sd: StoryData) => {
            let isValidURL = (sd: StoryData): boolean => {
                return typeof sd.url === 'string'
            }
            let isValidTitle = (sd: StoryData): boolean => {
                return typeof sd.title === 'string'
            }
            let isValidScore = (sd: StoryData): boolean => {
                return typeof sd.score === 'number'
            }

            isCard = isValidTitle(sd) && isValidScore(sd) ? true : false
            isStoryCard = isCard && isValidURL(sd) ? true : false
            isCommentCard = isCard && (!isStoryCard) ? true : false
        }

        let commentURL: string = URL.HKN_COMMENT_ORIGIN + String(sd.id)

        let setCommentURL = (): void => {
            sd.url = commentURL
        }

        let initCard = (sd: StoryData): void => {
            applyCardType(sd)
            if (isCommentCard) {
                setCommentURL()
                // console.log("COMMENT CARD: ", sd.rank)
            } else if (isStoryCard) {
                // console.log("STORY CARD: ", sd.rank)
            } else {
                console.log("UNDEFINED CARD-TYPE: ", sd.rank)
                console.trace(sd)
            }
        }

        initCard(sd)
        let card: DOMElement = this.domElementsEditor.createDiv(parent, ['card', 'out-view'], null)
        if (isCard) {
            let anchorArea: DOMElement = this.domElementsEditor.createAnchor(card.elem, ['anchorArea'], sd.url, null, 'Link to external site')
            let rank: DOMElement = this.domElementsEditor.createDiv(anchorArea.elem, ['rank'], String(sd.rank))
            // .STORY
            let story: DOMElement = this.domElementsEditor.createDiv(anchorArea.elem, ['story'], null)
            let title: DOMElement = this.domElementsEditor.createDiv(story.elem, ['title'], sd.title)
            // .STORY > METADATA
            let commentNum = sd.kids ? sd.kids.length : 0
            let metaData: DOMElement = this.domElementsEditor.createDiv(story.elem, ['meta-data'], null)
            let inlineBlock01: DOMElement = this.domElementsEditor.createElem('span', metaData.elem, ['inline-block', 'points'], null, `${sd.score} `, null)
            let inlineBlock02: DOMElement = this.domElementsEditor.createElem('span', metaData.elem, ['inline-block'], null, `points by ${sd.by} `, null)
            let inlineBlock03: DOMElement = this.domElementsEditor.createElem('span', metaData.elem, ['inline-block'], null, `X hours ago, `, null)
            let inlineBlock04: DOMElement = this.domElementsEditor.createElem('span', metaData.elem, ['inline-block', 'comment-num'], null, `${commentNum} `, null)
            let inlineBlock05: DOMElement = this.domElementsEditor.createElem('span', metaData.elem, ['inline-block'], null, `comments`, null)
            // .SCORE
            let score: DOMElement = this.domElementsEditor.createAnchor(card.elem, ['score'], commentURL, null, 'Link to Hacker News comment page')
            // let scoreSpan: DOMElement = this.domElementsEditor.createElem('span', score.elem, ['scoreSpan', 'arrow_box'], null, null, null)
            let scoreSpan: DOMElement = this.domElementsEditor.createDiv(score.elem, ['scoreSpan', 'arrow_box'], null)
            
            rank.add()
            story.add()
            title.add()
            metaData.add()
            inlineBlock01.add()
            inlineBlock02.add()
            inlineBlock03.add()
            inlineBlock04.add()
            inlineBlock05.add()
            anchorArea.add()
            scoreSpan.add()
            score.add()
            card.add()
            await card.addClass('in-view')

        } else {
            console.log("Error")
        }
    }
}