import { App, ViewCreator } from "obsidian";
import { URMView, VIEW_TYPE_URM_DEFAULLT } from "../ui/ReactView";
import UnnotedReasonMemo from "main";

export class ViewRegister{
    constructor(private plugin: UnnotedReasonMemo) {}

    async registerAllView(){
        this.plugin.registerView(
			VIEW_TYPE_URM_DEFAULLT,
			(leaf) => new URMView(leaf, this.plugin)
		);
    }
}

