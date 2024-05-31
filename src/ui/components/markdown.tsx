import { useEffect, useState } from 'react';
import { App, Component, MarkdownRenderer, htmlToMarkdown } from "obsidian";

export const MarkdownCom = ({ plugin, contents, title, component }: {
    plugin: App, 
    contents: string, 
    title: string, 
    component: Component
}) => {
    const [html, setHtml] = useState("");

    useEffect(() => {
        let span: HTMLElement = document.createElement("span");
        span.empty();

        MarkdownRenderer.render(
            plugin,
            contents,
            span,
            "[[" + title + "]]",
            component
        );

        setHtml(span.innerHTML);
    }, [plugin, contents, title, component]);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
};