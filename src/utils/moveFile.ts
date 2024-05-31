import {App, MarkdownView, Keymap, Vault, TFile} from 'obsidian'

export const navToFile = async (
  app: App,
  path: string,
  ev: MouseEvent,
//   line?: number,
) => {
  path = ensureMdExtension(path)
  const file = getFileFromPath(app.vault, path)

  if (!file) return
  const mod = Keymap.isModEvent(ev)
  const leaf = app.workspace.getLeaf(mod)
  await leaf.openFile(file)
//   if (line) {
//     app.workspace.getActiveViewOfType(MarkdownView).editor.setCursor(line)
//   }
}

// export const hoverFile = (event: MouseEvent, app: App, filePath: string) => {
//   const targetElement = event.currentTarget
//   const timeoutHandle = setTimeout(() => {
//     app.workspace.trigger('link-hover', {}, targetElement, filePath, filePath)
//   }, 800)
//   targetElement!.addEventListener('mouseleave', () => {
//     clearTimeout(timeoutHandle)
//   })
// }

export const ensureMdExtension = (path: string) => {
    if (!/\.md$/.test(path)) return `${path}.md`
    return path
} 
export const getFileFromPath = (vault: Vault, path: string) => {
    let file = vault.getAbstractFileByPath(path)
    if (file instanceof TFile) return file
    const files = vault.getFiles()
    file = files.find(e => e.name === path) as TFile | null;
    if (file instanceof TFile) return file
}