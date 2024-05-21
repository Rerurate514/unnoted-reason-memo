import { StrictMode } from "react";
import { ItemView, WorkspaceLeaf } from "obsidian";
import { Root, createRoot } from "react-dom/client";
import { URMCard } from "./components/urmCard";

export const VIEW_TYPE_URM_DEFAULLT = "urm-default-view";

export class URMView extends ItemView {
	root: Root | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_URM_DEFAULLT;
	}

	getDisplayText() {
		return "URM Default View";
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
                <URMCard contents={{
                    noteTitle: 'My Note Title',
                    status: 'Actived',
                    desc: 'This is a description of my note.'
                }}/>
            </StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}