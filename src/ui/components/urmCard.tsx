import { useState } from "react";

type URMCARD = {
    noteTitle: string,
    status: string,
    desc: string
}

export const URMCard = (props: {contents: URMCARD}) => {
    // const [desc, setDesc] = useState("");

    return <div className="urm-card">
        <h3 className="center">{props.contents.noteTitle}</h3>
        <p>Status: {props.contents.status}</p>
        <p>Description: {props.contents.desc}</p>
    </div>;
}