import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginManifest, WorkspaceLeaf } from 'obsidian';
import { SettingTab } from 'setting-tabs';
import { UnnotedReasonMemoSettings, SETTINGS } from 'setting';
import { ViewRegister } from "./load/viewRegister";
import { URMView, VIEW_TYPE_URM_DEFAULLT } from 'ui/ReactView';

import { URMFileReader } from "logic/FileReader";


export default class UnnotedReasonMemo extends Plugin {
	viewRegister = new ViewRegister();

	settings: UnnotedReasonMemoSettings;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
}

	async onload() {
		await this.loadSettings();

		//this.viewRegister.registerAllView(this.registerView)

		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		this.registerView(
			VIEW_TYPE_URM_DEFAULLT,
			(leaf) => new URMView(leaf)
		);

		const fileReader = new URMFileReader(
			this.app,
			this,
		);


		this.addCommand({
			id: 'react-sample',
			name: 'react サンプル',
			callback: () => {
				fileReader.readMatchFiles();
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

