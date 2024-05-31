import { URM } from "models/URM";
import { useState } from "react";
import { MarkdownCom } from "./markdown"
import { Component } from "obsidian";

export const URMCard = (props: {contents: URM}) => {
    const [desc, setDesc] = useState("");

    let card = document.createElement("div");
    card.className = "urm-card";

    function buttonTapped(){
        props.contents.plugin.openDescEditor(props.contents);
    }

    return <div className="urm-card-content markdown-preview-view">
        <MarkdownCom
            plugin={props.contents.plugin.app} 
            contents={props.contents.toMarkdown(desc)} 
            title={props.contents.noteTitle} 
            component={new Component()} 
        />
        <button 
            type="button"
            onClick={buttonTapped}
        >Memoを編集</button>
    </div>;
}
