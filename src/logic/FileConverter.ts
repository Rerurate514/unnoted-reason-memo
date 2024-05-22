import UnnotedReasonMemo from "main";
import { TAbstractFile, TFile, Vault, App } from "obsidian";

export class FileConverter{
    constructor(private plugin: UnnotedReasonMemo){}

    async convertURMCardFromTfile(file: TFile): Promise<UrmCardValue>{
        let status = "";
        await this.plugin.app.fileManager.processFrontMatter(
            file,
            (frontmatter) => {
                status = frontmatter[this.plugin.settings.useProperty];
            }
        );
        
        let result : UrmCardValue = {
            noteTitle: file.basename,
            status: status,
            desc: ""
        };

        return result;
    }
}