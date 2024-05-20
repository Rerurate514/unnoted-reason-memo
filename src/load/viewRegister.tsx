import { ViewCreator } from "obsidian";
import { URMView, VIEW_TYPE_URM_DEFAULLT } from "../ui/ReactView";

export class ViewRegister{
    async registerAllView(register: (type: string, viewCreator: ViewCreator) => void){
        register(
			VIEW_TYPE_URM_DEFAULLT,
			(leaf) => new URMView(leaf)
		);
    }
}

