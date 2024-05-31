import { URM } from "models/URM";
import { useState } from "react";
import { MarkdownCom } from "./markdown"
import { Component } from "obsidian";

export const URMCard = (props: {contents: URM}) => {
    const [desc, setDesc] = useState("");

    let card = document.createElement("div");
    card.className = "urm-card";

    function buttonTapped(){
        
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
        {/* <input
            type="text"
            placeholder="編集"
            aria-label="編集"
            onChange={((e) => setDesc(e.target.value))}
        ></input> */}
    </div>;
}
