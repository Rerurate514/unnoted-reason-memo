import { useEffect, useState } from 'react';
import { App, Component, MarkdownRenderer } from "obsidian";

export const MarkdownCom = ({ plugin, contents, title, component }: {
    plugin: App, 
    contents: string, 
    title: string, 
    component: Component
}) => {
    const [html, setHtml] = useState("");

    useEffect(() => {
        let span: HTMLSpanElement = document.createElement("span");
        span.innerHTML = '';

        MarkdownRenderer.render(
            plugin,
            contents,
            span,
            title,
            component
        );

        setHtml(span.outerHTML);
    }, [plugin, contents, title, component]);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};