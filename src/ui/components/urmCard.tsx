import { useState } from "react";

export const URMCard = (props: {contents: UrmCardValue}) => {
    // const [desc, setDesc] = useState("");

    return <div className="urm-card">
        <h3 className="center">{props.contents.noteTitle}</h3>
        <p>Status: {props.contents.status}</p>
        <p>Description: {props.contents.desc}</p>
    </div>;
}