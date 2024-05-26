import { StrictMode } from "react";
import { ItemView, WorkspaceLeaf } from "obsidian";
import { Root, createRoot } from "react-dom/client";
import { URMCardList } from "./components/urmCardList";
import UnnotedReasonMemo from "main";

export const VIEW_TYPE_URM_DEFAULLT = "urm-default-view";

export class URMView extends ItemView {
	root: Root | null = null;

	constructor(leaf: WorkspaceLeaf, private plugin: UnnotedReasonMemo) {
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
				<URMCardList contents={this.plugin.settings.urmList} />
            </StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}