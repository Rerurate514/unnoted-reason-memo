import { URMView, VIEW_TYPE_URM_DEFAULLT } from "../ui/components/example";

export class ViewRegister{
    async registerAllView(){
        this.registerView(
			VIEW_TYPE_URM_DEFAULLT,
			(leaf) => new URMView(leaf)
		);
    }
}