export type TranslationKey =
	| "Logout"
	| "Produkte"
	| "Einstellungen"
	| "Benutzer"
	| "Name"
	| "Passwort"
	| "Login"
	| "Nutzerverwaltung"
	| "Löschen"
	| "Einladen"
	| "Nutzer existiert nicht"
	| "Nutzer einladen"
	| "Benutzereinstellungen";

export type Translate = (key: TranslationKey) => string;
