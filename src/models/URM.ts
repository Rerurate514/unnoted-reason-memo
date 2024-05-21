import UnnotedReasonMemo from "main";
import { TFile } from "obsidian";

export class URM{
    urmList: {[noteTitle: string]: UrmCardvalue}[] = [];

    constructor(loadedUrmList: {[noteTitle: string]: UrmCardvalue}[]){
        this.load(loadedUrmList);
    }

    load(urmList: {[noteTitle: string]: UrmCardvalue}[]){
        this.urmList = urmList;
    }

    add(file: TFile, urmCardValue: UrmCardvalue): void{
        let map: {[noteTitle: string]: UrmCardvalue} = {};
        map[file.basename] = urmCardValue;

        this.urmList.push(map);
    }

    save(plugin: UnnotedReasonMemo){
        plugin.settings.urmList = this.urmList;
        plugin.saveSettings();
    }
}