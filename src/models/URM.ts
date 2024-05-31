import UnnotedReasonMemo from "main";
import { App, Vault } from "obsidian";

export class URM{
    plugin: UnnotedReasonMemo
    noteTitle: string;
    status: string;
    desc: string | null;

    constructor(
        private app: App,
        plugin: UnnotedReasonMemo,
        private urmCardValue: UrmCardValue
    ){
        this.app = app;
        this.plugin = plugin;
        this.noteTitle = urmCardValue.noteTitle;
        this.status = urmCardValue.status;
        this.desc = urmCardValue.desc;
    }

    noteTitleMd: string = "## [" + this.urmCardValue.noteTitle + "](obsidian://open?vault="+ this.app.vault.getName() +"&file="+ this.urmCardValue.noteTitle +")\n";
    statusMd: string = "Status : " + this.urmCardValue.status + "\n";
    descMd: string = "Description : " + this.urmCardValue.desc;

    toMarkdown(desc: string): string{
        return this.noteTitleMd + this.statusMd + this.descMd + desc;
    }
}
