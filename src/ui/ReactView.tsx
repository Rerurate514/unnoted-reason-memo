import { StrictMode } from "react";
import { ItemView, WorkspaceLeaf } from "obsidian";
import { Root, createRoot } from "react-dom/client";
import { ReactView } from "./components/example";
import React from "react";


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
                <ReactView></ReactView>
            </StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}