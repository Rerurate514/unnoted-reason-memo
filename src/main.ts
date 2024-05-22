import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginManifest, WorkspaceLeaf } from 'obsidian';
import { SettingTab } from 'setting-tabs';
import { UnnotedReasonMemoSettings, SETTINGS } from 'setting';
import { ViewRegister } from "./load/viewRegister";
import { URMView, VIEW_TYPE_URM_DEFAULLT } from 'ui/ReactView';

import { URMFileReader } from "logic/FileReader";
import { URM } from 'models/URM';
import { FileConverter } from 'logic/FileConverter';


export default class UnnotedReasonMemo extends Plugin {
	viewRegister = new ViewRegister(this);

	settings: UnnotedReasonMemoSettings;

	constructor(app: App, manifest: PluginManifest) {
		super(app, manifest);
}

	async onload() {
		await this.loadSettings();
		const fileReader = new URMFileReader(this);
		const viewRegister = new ViewRegister(this);
		const urm: URM = new URM(this, this.settings.urmList);
		const converter: FileConverter = new FileConverter(this)
		
		viewRegister.registerAllView();

		this.addCommand({
			id: 'files-load',
			name: 'ファイルをロードする',
			callback: async () => {
				let files = await fileReader.readMatchFiles();
				for(let file of files){
					urm.add(file, await converter.convertURMCardFromTfile(file));
				}
				urm.save();
			}
		});

		this.addCommand({
			id: 'files-reset',
			name: 'ファイルをリセットする',
			callback: async () => {
				urm.reset();
				let files = await fileReader.readMatchFiles();
				for(let file of files){
					urm.add(file, await converter.convertURMCardFromTfile(file));
				}
				urm.save();
			}
		});

		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');



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

