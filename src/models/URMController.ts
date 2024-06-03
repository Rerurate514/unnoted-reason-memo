import UnnotedReasonMemo from "main";
import { TFile } from "obsidian";

export class URMController{
    urmList: {[noteTitle: string]: UrmCardValue} = {};

    constructor(private plugin: UnnotedReasonMemo, loadedUrmList: {[noteTitle: string]: UrmCardValue}){
        this.load(loadedUrmList);
    }

    load(urmList: {[noteTitle: string]: UrmCardValue}){
        this.urmList = urmList;
    }

    addURM(file: TFile, urmCardValue: UrmCardValue): void{
        this.urmList[file.basename] = urmCardValue;

        this.save();
    }

    save(){
        this.plugin.settings.urmList = this.urmList;
        this.plugin.saveSettings();
    }

    reset(){
        this.urmList = {};
        this.save();
    }
}