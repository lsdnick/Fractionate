// Fractionate 0.3
// Lamma Studio Design
// 12-5-2021

// Changelog
// 0.1 Initial release
// 0.2 Make Spaces Great Again
// 0.3 Move Fractions group to main menu

/////////////////////////// NOTES ///////////////////////////////
//                                                             //
//   You'll need the character styles: "Fraction Upper",       //
//   "Fraction Upper Last", "Fraction Slash" and               //
//   "Fraction Lower", to be in a group called "Fractions"     //
//                                                             //
//   To use, type out a fraction like 11/11 and select it,     //
//   then run the script. It ignores spaces at either end.     //
//                                                             //
/////////////////////////////////////////////////////////////////

fraction ();

function fraction(){
	try {

/////////////////////////////////////////////////////////////////
///////////////////////// SET IT UP /////////////////////////////
/////////////////////////////////////////////////////////////////

// How big is your selection?
		var fsize = app.selection[0].length;

// Did you forget to select something, Private Pyle? If so, whine about it and quit.
		if (fsize === null | fsize == 0) {alert ("Nothing selected!"); return;};

// What have you selected? 
		var fract = app.selection[0].contents;

// Setup the Character Styles
		var FUpStyle = app.activeDocument.characterStyleGroups.itemByName("Fractions").characterStyles.itemByName("Fraction Upper");
		var FUpLastStyle = app.activeDocument.characterStyleGroups.itemByName("Fractions").characterStyles.itemByName("Fraction Upper last");
		var FSlashStyle = app.activeDocument.characterStyleGroups.itemByName("Fractions").characterStyles.itemByName("Fraction Slash");
		var FLowStyle = app.activeDocument.characterStyleGroups.itemByName("Fractions").characterStyles.itemByName("Fraction Lower");
		var NoStyle = app.activeDocument.allCharacterStyles[0];

// Set up some flags for the legit fraction check
		var slasher = 0;
		var notfrac = new Boolean(false);

/////////////////////////////////////////////////////////////////
///////////////////////// CHECK IT //////////////////////////////
/////////////////////////////////////////////////////////////////

// While we're at, is this a legit fraction? If not, whine about it and quit. 
// Also ignore spaces at the beginning and the end but not anywhere else.
		for (i=0; i < fsize; i++){
			if (fract[i]=="/") {slasher += 1};
			if ((fract[i]==" ") && (i>1) && (i<fsize)) {notfrac = !notfrac};
			if ((isNaN (fract[i])) && (fract[i]!="/") && (fract[i]!=" ")){notfrac = !notfrac};
		};	
		if (notfrac | slasher==0){alert ("Your selection is not a fraction!"); return;};
		
// Go through the characters until you hit "/" then write down its position
		for (i=0; i < fsize; i++){
			if (fract[i]=="/") {var slashpos = i;}
		};

/////////////////////////////////////////////////////////////////
///////////////////////// STYLE IT //////////////////////////////
/////////////////////////////////////////////////////////////////
	
// Apply Fraction Upper style to everything before "/".  
		for (i=0; i < slashpos-1; i++){app.selection[0].characters.itemByRange(i,i).appliedCharacterStyle = FUpStyle;};

// Apply Fraction Upper Last style to the character before "/".  
		app.selection[0].characters.itemByRange(i, i).appliedCharacterStyle = FUpLastStyle;

// Apply Fraction Slash style to the "/".  
		app.selection[0].characters.itemByRange(i+1, i+1).appliedCharacterStyle = FSlashStyle;

// Apply Fraction Lower style to the stuff after "/".  
		for (i=slashpos+1; i < fsize; i++) {app.selection[0].characters.itemByRange(i,i).appliedCharacterStyle = FLowStyle;};

// Ignore spaces. Well, switch them back to "none" anyway.
		for (i=0; i < fsize; i++){
			if (fract[i]==" ") {
				app.selection[0].characters.itemByRange(i,i).appliedCharacterStyle = NoStyle; 
				app.selection[0].characters.itemByRange(i,i).clearOverrides();
			};
		};
	}
// if none of that works, whine about it and quit.
	catch (err) {
		alert ("General Error: " + [err,err.line]);
	};
};
