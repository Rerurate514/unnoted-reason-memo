import UnnotedReasonMemo from "main";
import { URMCard } from "./urmCard";
import { URM } from "models/URM";
import { App } from "obsidian";

export const URMCardList = (prop: {app: App, plugin: UnnotedReasonMemo}) => {
    
    let lists = prop.plugin.settings.urmList;
    return (
        <div>
            {lists.map((list, index) => (
                <URMCard contents={
                    new URM(
                        prop.app,
                        prop.plugin,
                        {
                            noteTitle: list[Object.keys(list)[0]].noteTitle,
                            status: list[Object.keys(list)[0]].status,
                            desc: list[Object.keys(list)[0]].desc
                        }
                    )
                } />
            ))}
        </div>
    );
};
