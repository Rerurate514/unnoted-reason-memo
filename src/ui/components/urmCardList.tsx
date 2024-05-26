import UnnotedReasonMemo from "main";
import { URMCard } from "./urmCard";
import { URM } from "models/URM";

export const URMCardList = (plugin: {content: UnnotedReasonMemo}) => {
    let lists = plugin.content.settings.urmList;
    return (
        <div>
            {lists.map((list, index) => (
                <div key={index}>
                    <URMCard contents={
                        new URM(
                            plugin.content,
                            {
                                noteTitle: list[Object.keys(list)[0]].noteTitle,
                                status: list[Object.keys(list)[0]].status,
                                desc: list[Object.keys(list)[0]].desc
                            }
                        )
                    } />
                </div>
            ))}
        </div>
    );
};
