import UnnotedReasonMemo from "main";

export function registerMouseEvt(plugin: UnnotedReasonMemo) : MouseEvent | void {
    let evtResult: MouseEvent;

    plugin.registerDomEvent(document, 'click', (evt: MouseEvent) => {
        return evt;
    });
}