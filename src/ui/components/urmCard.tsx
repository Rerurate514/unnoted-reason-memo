import { useState } from "react";
import "../modules/URMCard.module.css";

type URMCARD = {
    noteTitle: string,
    status: string,
    desc: string
}

export const URMCard = (props: {contents: URMCARD}) => {
    const [desc, setDesc] = useState("");

    return <div className="card">
        <h3>{props.contents.noteTitle}</h3>
        <p>Status: {props.contents.status}</p>
        <p>Description: {desc}</p>
    </div>;
}