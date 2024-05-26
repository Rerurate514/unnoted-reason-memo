import UnnotedReasonMemo from "main";

export class URM{
    plugin: UnnotedReasonMemo;

    noteTitle: string;
    status: string;
    desc: string | null;

    constructor(
        plugin: UnnotedReasonMemo,
        private urmCardValue: UrmCardValue
    ){
        this.plugin = plugin;
        this.noteTitle = urmCardValue.noteTitle;
        this.status = urmCardValue.status;
        this.desc = urmCardValue.desc;
    }

    private noteTitleMd: string = "## [[" + this.urmCardValue.noteTitle + "]]\n";
    private statusMd: string = "Status : " + this.urmCardValue.status + "\n";
    private descMd: string = "Description : " + this.urmCardValue.desc + "\n";

    toMarkdown(): string{
        console.log(this.noteTitleMd + this.statusMd + this.descMd);
        return this.noteTitleMd + this.statusMd + this.descMd;
    }
}