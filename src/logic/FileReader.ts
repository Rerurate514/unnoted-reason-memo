import UnnotedReasonMemo from "main";
import { TAbstractFile, TFile, Vault, App } from "obsidian";

export class URMFileReader{
    private vault: Vault;

    constructor(
        private app: App,
        private plugin: UnnotedReasonMemo,
    ) { 
        this.vault = this.app.vault;
    }

    
    async reloadAllFiles() {
        let matchedFiles: TFile[] = [];
        for (const file of this.vault.getMarkdownFiles()) {
            await this.reloadFile(file);
            if(await this.isMatchPropertyValue(file)) continue;
            matchedFiles.push(file);
        }
    }

    private async reloadFile(file: TAbstractFile) {
        if (!(file instanceof TFile)) return false;
        if (!this.isMarkdownFile(file)) return false;
    }

    private isMarkdownFile(file: TFile): boolean{
        return file.extension.toLowerCase() === "md";
    }

    private async isMatchPropertyValue(file: TFile): Promise<boolean>{
        let isMatched: boolean = false;
        const targetPropertyKey = this.plugin.settings.useProperty;
        const values = this.plugin.settings.targetPropertyValues;

        await this.app.fileManager.processFrontMatter(
            file,
            (frontmatter) => {
                if(values.contains(frontmatter[targetPropertyKey])) isMatched = true;
            }
        );

        return isMatched;
    }
}