import { StrictMode } from "react";
import { ItemView, WorkspaceLeaf, MarkdownRenderer, App } from "obsidian";
import { Root, createRoot } from "react-dom/client";
import { URMCardList } from "./components/urmCardList";
import UnnotedReasonMemo from "main";

export const VIEW_TYPE_URM_DEFAULLT = "urm-default-view";

export class URMView extends ItemView {
	root: Root | null = null;
	app : App;

	constructor(
		leaf: WorkspaceLeaf, 
		app: App,
		private plugin: UnnotedReasonMemo
	) {
		super(leaf);
		app = this.app;
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
				<URMCardList app={this.app} plugin={this.plugin} />
            </StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}