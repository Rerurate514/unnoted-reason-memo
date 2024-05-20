import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginManifest, WorkspaceLeaf } from 'obsidian';
import { SettingTab } from 'setting-tabs';
import { UnnotedReasonMemoSettings, SETTINGS } from 'setting';
import { URMView, VIEW_TYPE_URM_DEFAULLT } from "./ui/components/example";


export default class UnnotedReasonMemo extends Plugin {
	settings: UnnotedReasonMemoSettings;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
}

	async onload() {
		await this.loadSettings();

		this.registerView(
			VIEW_TYPE_URM_DEFAULLT,
			(leaf) => new URMView(leaf)
		);


		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');


		this.addCommand({
			id: 'react-sample',
			name: 'react サンプル',
			callback: () => {
				this.activateView();
			}
		});

		this.addRibbonIcon("dice", "Activate view", () => { this.activateView(); });

		this.addSettingTab(new SettingTab(this.app, this));


		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	async activateView() {
		const { workspace } = this.app;
	
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_URM_DEFAULLT);
	
		if (leaves.length > 0) {
		  leaf = leaves[0];
		} else {
		  leaf = workspace.getRightLeaf(false);
		  await leaf!.setViewState({ type: VIEW_TYPE_URM_DEFAULLT, active: true });
		}
	
		workspace.revealLeaf(leaf!);
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

