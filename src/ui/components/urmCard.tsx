import { URM } from "models/URM";
import { useState } from "react";
import { MarkdownCom } from "./markdown"
import { Component } from "obsidian";

export const URMCard = (props: {contents: URM}) => {
    // const [desc, setDesc] = useState("");

    return <div className="urm-card">
        <MarkdownCom
            plugin={props.contents.plugin.app} 
            contents={props.contents.toMarkdown()} 
            title={props.contents.noteTitle} 
            component={new Component()} 
        />
        {/* <h3 className="urm-title">[[{props.contents.noteTitle}]]</h3>
        <p className="urm-list">Status : {props.contents.status}</p>
        <p className="urm-list">Description : {props.contents.desc}</p>
        <input type="text" placeholder="編集" aria-label="編集" role="combobox" aria-haspopup="false" aria-autocomplete="list" dir="ltr"></input> */}
    </div>;
}