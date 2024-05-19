import { App, ButtonComponent, DropdownComponent, TextComponent, PluginSettingTab, Setting } from "obsidian";
import UnnotedReasonMemo from "./main";

export class SettingTab extends PluginSettingTab {
	plugin: UnnotedReasonMemo;

	constructor(app: App, plugin: UnnotedReasonMemo) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		this.addUseProperty(containerEl);
		this.addUsePropertyValue(containerEl);
	}

	addUseProperty(containerEl: HTMLElement): void {
		if (!containerEl.hasChildNodes()) containerEl.empty();

		new Setting(containerEl)
		.setName('使用するプロパティを記入する。')
		.setDesc('入力したプロパティ名を参照して、未完成ノートリストをプラグインから作成します。')
		.addText(text => text
			.setPlaceholder('Enter use property name')
			.setValue(this.plugin.settings.useProperty)
			.onChange(async (value) => {
				this.plugin.settings.useProperty = value;
				await this.plugin.saveSettings();
			}));
	}

	addUsePropertyValue(containerEl: HTMLElement): void {
		if (!containerEl.hasChildNodes()) containerEl.empty();

		new Setting(containerEl)
			.setName("対象となるプロパティの値を記入する。")
			.setDesc("この値が一致したノートを抽出します。")
			.then((s) => {
				let button: ButtonComponent | null = null,
					input: TextComponent | null = null;
				s.addText((txt) => {
					txt
						.setPlaceholder("Enter Property Value")
						.then((txt) => txt.inputEl.addClass("isc-add-pack-input")),
						(input = txt);
				}).addButton(
					(btn) => (
						btn
							.setCta()
							.setIcon("plus-with-circle")
							.onClick(() => {
								const targetPropertyValue = input?.getValue();
								if (!targetPropertyValue) return;
								this.addNewPropertyValueEntry(
									targetPropertyValue,
									containerEl,
								).settingEl.scrollIntoView();
								input?.setValue("");

								this.plugin.settings.targetPropertyValues.push(targetPropertyValue);
							}),
						(button = btn)
					),
				);
			});

		this.plugin.settings.targetPropertyValues.forEach((targetPropertyValue) =>
			this.addNewPropertyValueEntry(targetPropertyValue, containerEl),
		);
	}

	addNewPropertyValueEntry(targetPropertyValue: string, containerEl: HTMLElement) {
    const setting = new Setting(containerEl)
      .setName(targetPropertyValue)
      .setDesc("ここに表示されている値とマッチしたノートを取り出します。")
      .addButton((btn) =>
        btn
          .setIcon("trash")
          .setTooltip("delete")
          .setWarning()
          .onClick(() => {
						this.plugin.settings.targetPropertyValues = 
							this.plugin.settings.targetPropertyValues.filter((ele) => targetPropertyValue == ele);
						containerEl.removeChild(setting.settingEl);
						this.plugin.saveSettings();
          }),
      )
    return setting;
  }
}