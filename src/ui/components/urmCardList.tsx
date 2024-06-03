import UnnotedReasonMemo from "main";
import { URMCard } from "./urmCard";
import { URM } from "models/URM";
import { App } from "obsidian";

export const URMCardList = (prop: {app: App, plugin: UnnotedReasonMemo}) => {
    
    let lists = prop.plugin.settings.urmList;
    return (
        <div>
            {Object.entries(lists).map(([noteTitle, cardValue], index) => (
                <URMCard contents={
                    new URM(
                        prop.app,
                        prop.plugin,
                        {
                            noteTitle: cardValue.noteTitle,
                            status: cardValue.status,
                            desc: cardValue.desc
                        }
                    )
                } />
            ))}
        </div>
    );
};
