import './scss/style.scss'
import Render from './Render'
import PacketManager from './ts/Story/PacketManager'
import { reachedPageBttmFrom } from './ts/Utility'
import { StoryData } from './ts/HKNews'
import DOMElement from './ts/Writer/DOMElement'
import DOMElementsEditor from './ts/Writer/DOMElementsEditor'

const renderer: Render = new Render()
const packetManager: PacketManager = new PacketManager()
const triggerRenderPercent: number = 0.93
const dee: DOMElementsEditor = new DOMElementsEditor()

window.addEventListener('scroll', () => {
    window.requestAnimationFrame(animation)
})
let animation = async (): Promise<any> => {
    if (reachedPageBttmFrom(triggerRenderPercent)) {
        if (renderer.isLockedRendering === false) {
            await render()
        } else {
            // console.log("")
        }
    } else {
        await load()
    }
}

let isLoaded: boolean = false

// TODO: エラー投げて処理した方が読みやすい?
// ロードは何回もキューが入るので データロード中に入ったキューはキャンセルする
let load = async (): Promise<boolean> => {
    // ロード済みか確認
    if (packetManager.isReadablePacket()) {
        console.log("1: 成功 すでにデータあり")
        return true// 成功
    } else {
        // ロード中か確認
        if (packetManager.isLoading === true) {
            console.log("3: 中断 データロード中")
            return false// 失敗 loadはキャンセルされる
        } else {
            // appear loading icon
            addLoadingIcon()
            await packetManager.loadSinglePacket()
            console.log("4: 成功 データ取得完了")
            // disapper loading icon
            removeLoadingIcon()
            isLoaded = true
            return true// 成功
        }
    }
}

let addLoadingIcon = (): void => {
    console.log("loading icon 表示")
    let loadingIcon: DOMElement | null = null
    let loadingParent: Element | null = document.getElementById('scroll')
    if (loadingParent !== null) {
        loadingIcon = dee.createDiv(loadingParent, ['card', 'loading-icon'], 'Loading...')
    }
    if (loadingIcon !== null) loadingIcon.add()
}

let removeLoadingIcon = (): void => {
    console.log("loading icon 非表示")
    let loadingIcons: HTMLCollection | null = null
    loadingIcons = document.getElementsByClassName('loading-icon')
    for (let i = 0; i < loadingIcons.length; i++) {
        loadingIcons[i].remove()
    }
}

let render = async (): Promise<any> => {
    let successLoad = await load()
    if (!successLoad) { return false }

    console.log('A: データ確認OK レンダリング開始')

    let singlePacket: StoryData[] = packetManager.getSinglePacket()
    await renderer.render(singlePacket)
    packetManager.afterRendering()
    isLoaded = false// 完了後はFALSE
}

render()

let elem: HTMLElement | null = document.getElementById('header')
let avoidLock = async (): Promise<any> => {
    // TODO 全件ロード時はずっとロックしてしまう
    if (reachedPageBttmFrom(0.99)) {
        if (elem !== null) elem.style.backgroundColor = "#FF0000"
        if (renderer.isLockedRendering === false) {
            await render()
        }
    } else {
        if (elem !== null) elem.style.backgroundColor = "#FFFFFF"
    }
    window.requestAnimationFrame(avoidLock)
}

window.requestAnimationFrame(avoidLock)