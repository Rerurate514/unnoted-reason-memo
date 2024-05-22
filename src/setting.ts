export interface UnnotedReasonMemoSettings {
	useProperty: string;
	targetPropertyValues: string[];
	urmList: {[noteTitle: string]: UrmCardValue}[]
}

export const SETTINGS: UnnotedReasonMemoSettings = {
	useProperty: '',
	targetPropertyValues: [],
	urmList: []
}