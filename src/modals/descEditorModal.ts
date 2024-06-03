import { App, Modal } from "obsidian";
import { text } from "stream/consumers";

export class DescEditorModal extends Modal {
    creater: ElementBuilder = new ElementBuilder();
    titleStr: string = "";

	constructor(app: App) {
		super(app);
	}

    setTitleStr(title: string) {
        this.titleStr = title;
    }

	onOpen() {
		const {contentEl} = this;
        this.setTitle(this.titleStr + " のメモを編集");
        contentEl.appendChild(this.creater.buildContents())
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

    
}

class ElementBuilder{
    buildContents(): HTMLElement{
        let container = document.createElement("div");
        container.appendChild(this.buildTextArea());
        container.appendChild(this.buildButton());
        return container;
    }

    buildTextArea(): HTMLElement{
        let textArea = document.createElement("textarea");

        textArea.style.resize = "none";
        textArea.style.width = "100%";
        textArea.style.margin = "";

        return textArea;
    }

    buildButton(): HTMLElement{
        let container = document.createElement("div");
        container.style.width = "100%";
        container.style.textAlign = "right";
        container.style.paddingTop = "1em";
        
        let button = document.createElement("button");
        button.textContent = "決定";

        container.appendChild(button);

        return container;
    }
}
