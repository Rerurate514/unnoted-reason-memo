import UnnotedReasonMemo from "main";
import { App, Modal } from "obsidian";

const URM_MODAL_TEXRAREA_ID = "urm-desc-modal-id";

export class DescEditorModal extends Modal {
    creater: ElementBuilder;
    titleStr: string = "";

	constructor(app: App, private plugin: UnnotedReasonMemo) {
		super(app);
	}

    setTitleStr(title: string) {
        this.titleStr = title;
        this.creater = new ElementBuilder(this.plugin, this.titleStr);
    }

	async onOpen() {
		const {contentEl} = this;
        this.setTitle(this.titleStr + " のメモを編集");
        contentEl.appendChild(await this.creater.buildContents())
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class ElementBuilder{
    constructor(
        private plugin: UnnotedReasonMemo,
        private titleStr: string
    ){}

    buildContents(): HTMLElement{
        let container = document.createElement("div");
        container.appendChild(this.buildTextArea());
        container.appendChild(this.buildButton());
        return container;
    }

    buildTextArea(): HTMLTextAreaElement{
        let textArea = document.createElement("textarea");

        textArea.style.resize = "none";
        textArea.style.width = "100%";
        textArea.style.margin = "";

        textArea.id = URM_MODAL_TEXRAREA_ID;

        return textArea;
    }

    buildButton(): HTMLElement{
        let container = document.createElement("div");
        container.style.width = "100%";
        container.style.textAlign = "right";
        container.style.paddingTop = "1em";
        
        let button = document.createElement("button");
        button.textContent = "決定";

        button.addEventListener("click", async function(){
            let plugin: UnnotedReasonMemo = this.plugin;
            plugin.settings.urmList[this.titleStr].desc = this.getTextAreaValue();
            await plugin.saveSettings();
            plugin.closeDescEditor();
        }.bind(this), false);

        container.appendChild(button);

        return container;
    }

    getTextAreaValue(): string{
        let textarea = <HTMLTextAreaElement>document.getElementById(URM_MODAL_TEXRAREA_ID);
        return textarea.value;
    }
}
