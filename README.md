# Phone Application

### How To Open
> 1. Go to the folder downloaded from the project
> 2. Right click on the file named _index.html_
> 3. Choose the _open with_ option
> 4. Open the file in your preferred browser

### How To Use
- Dialler
	- Use dialler pad to enter or remove a number
	- Use call icon to be redirected to the device's phone app with that number
- Contacts
	- Fill in the desired contacts details
	- Press the _+_ icon to add the contact
	- Press a contact's star icon to add it to the favourites section
	- Press a contact's cross icon to remove the contact
	- Contacts that have been added to the favourites section cannot be removed
- Favourites
	- This is a list of all contacts the have been favourited in alphabetical order (ascending)
	
### Requirements
> 1. This projects requires a browser to run
> 2. The browser must have Javascript available and enabled

### Known Errors
- Logical
	1. Getting error: "Uncaught Type: Cannot read property 'removeChild' of null" when I try to remove a contact
	2. Error in contact adding logic: If I add a contact with the first name "Alice" and the surname "Bobson" then I add a contact with the first name "Bobson" and the surname "Alice", I cannot the contact "Alice Alice" or "Bobson Bobson"
	3. Trying to remove a starred contact correctly activates the custom error box for displaying the error but the message is shown for that contact and all contacts added after it
- Semantic
	1. When you scroll down the contacts section the input field at the top of the element should always be visible
	2. The lists of contacts/callees should preferably have the avatar to the very left (done), the name and number to the very left immadiately after the avatar (those are currently in the center/left center) and all other information to the very right (done for the dialler/favourites section, the stars in the contacts section are on the right center)
- Syntax
	- N/A

### Preview