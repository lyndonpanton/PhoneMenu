// Error found: If contact1 has firstname "a" and surname "z"
// and contact2 has firstname "z" and surname "a"
// If you try to add contact3 with firstname "a" and surname "a"
// or contact3 with firstname "z" and surname "z" the submission will fail

let navItems = document.getElementsByClassName("nav-item");
Array.from(navItems).forEach(function(item) {
	item.addEventListener("click", function() {
		for (let i = 0; i < Array.from(navItems).length; i++) {
			navItems[i].classList.remove("selected");
		}

		item.classList.add("selected");
	});
});

let people = [];
let colors = [
	"hsla(0, 100%, 50%, 1)", 
	"hsla(15, 100%, 50%, 1)", 
	"hsla(30, 100%, 50%, 1)",
	"hsla(45, 100%, 50%, 1)",
	"hsla(60, 100%, 50%, 1)",
	"hsla(75, 100%, 50%, 1)",
	"hsla(90, 100%, 50%, 1)",
	"hsla(105, 100%, 50%, 1)",
	"hsla(120, 100%, 50%, 1)",
	"hsla(135, 100%, 50%, 1)",
	"hsla(150, 100%, 50%, 1)",
	"hsla(165, 100%, 50%, 1)",
	"hsla(180, 100%, 50%, 1)",
	"hsla(195, 100%, 50%, 1)",
	"hsla(210, 100%, 50%, 1)",
	"hsla(225, 100%, 50%, 1)",
	"hsla(240, 100%, 50%, 1)",
	"hsla(255, 100%, 50%, 1)",
	"hsla(270, 100%, 50%, 1)",
	"hsla(285, 100%, 50%, 1)",
	"hsla(300, 100%, 50%, 1)",
	"hsla(315, 100%, 50%, 1)",
	"hsla(330, 100%, 50%, 1)",
	"hsla(345, 100%, 50%, 1)"
];
let starred = [];
let removeButtons = [];
let repeatName = "";

let contactForm = document.getElementById("form-contact");
contactForm.addEventListener("submit", function(e) {
	e.preventDefault();

	let formFirstName = document.getElementById("form-firstname").value;
	let formSurname = document.getElementById("form-surname").value;
	let formNumber = document.getElementById("form-number").value;

	let errorContainer = document.createElement("div");

	let errorF = document.createElement("span");
	errorF.className = "error-line";
	errorF.textContent = `${validateFirstName(formFirstName)}`;

	let errorS = document.createElement("span");
	errorS.className = "error-line";
	errorS.textContent = `${validateSurname(formSurname)}`;

	let errorN = document.createElement("span");
	errorN.className = "error-line";
	errorN.textContent = `${validateNumber(formNumber)}`;

	let errorFS = document.createElement("span");
	errorFS.className = "error-line";
	if (repeatName.length == 2) {
		errorFS.textContent = "First name and surname combination already exists";
	}

	repeatName = "";

	console.log

	errorContainer.appendChild(errorF);
	errorContainer.appendChild(errorS);
	errorContainer.appendChild(errorN);

	if (errorContainer.textContent.length) {
		error(errorContainer);
		return false;
	}

	let contact = document.createElement("div");
	contact.className = "contact";

	let avatar = document.createElement("span");
	avatar.className = "avatar";
	avatar.style.backgroundColor = colors[Math.floor(Math.random() * 24)];

	let name = document.createElement("span");
	name.className = "name";
	name.textContent = `${formFirstName} ${formSurname}`;

	let number = document.createElement("span");
	number.className = "number";
	number.textContent = `${formNumber}`;

	let star = document.createElement("span");
	star.className = "star star-black";
	star.textContent = "\u2605";
	star.addEventListener("click", function() {
		if (Array.from(this.classList).indexOf("star-black") != -1) {
			this.classList.remove("star-black");
			this.classList.add("star-yellow");
			starred.push(this.parentElement);

			starred.sort(function(a, b) {
				let name1 = a.getElementsByClassName("name")[0].textContent.toLowerCase();
				let name2 = b.getElementsByClassName("name")[0].textContent.toLowerCase();

				if (name1 < name2) {
					return -1;
				} else {
					return 1;
				}
			});

			let favourites = document.getElementById("favourites");

			while (favourites.firstChild) {
				favourites.removeChild(favourites.firstChild);
			}

			starred.forEach(function(contact) {
				let clone = contact.cloneNode(true);
				clone.removeChild(clone.getElementsByClassName("remove")[0]);
				favourites.appendChild(clone);
			});
		} else {
			this.classList.remove("star-yellow");
			this.classList.add("star-black");
			starred.splice(starred.indexOf(this.parentElement), 1);

			while (favourites.firstChild) {
				favourites.removeChild(favourites.firstChild);
			}

			starred.forEach(function(contact) {
				let clone = contact.cloneNode(true);
				clone.removeChild(clone.getElementsByClassName("remove")[0]);
				favourites.append(clone);
			});
		}
	});

	let remove = document.createElement("div");
	remove.className = "remove";
	remove.textContent = "\u00D7";

	removeButtons.push(remove);
	removeButtons.forEach(function(button) {
		button.addEventListener("click", function() {
			let parent = button.parentElement;
			if (Array.from(parent.getElementsByClassName("star")[0].classList).indexOf("star-yellow") != -1) {
				// error(<element>Favourite contacts cannot be deleted</element>);
			} else {
				let grandParent = button.parentElement.parentElement;
				grandParent.removeChild(parent);

				people.splice(people.indexOf(parent), 1);
			}

		// 	// Alternative logic: Here you can delete starred contacts and both
		// 	// that contact and its matching element in the favourites list are removed
		// 	let parent = button.parentElement;
		// 	let favourites = document.getElementById("favourites").getElementsByClassName("contact");

		// 	if (Array.from(parent.getElementsByClassName("star")[0].classList).indexOf("star-yellow") != -1) {
		// 		let parentClone;
		// 		Array.from(favourites).forEach(function(favourite) {
		// 			if (favourite.getElementsByClassName("name")[0].textContent == parent.getElementsByClassName("name")[0].textContent) {
		// 				parentClone = favourite;
		// 			}
		// 		});

		// 		let grandParentClone = parentClone.parentElement;
		// 		grandParentClone.removeChild(parentClone);

		// 		starred.splice(starred.indexOf(parentClone), 1);
		// 	}
			
		// 	let grandParent = parent.parentElement;
		// 	grandParent.removeChild(parent);

		// 	people.splice(people.indexOf(parent), 1);
		});
	});

	contact.appendChild(avatar);
	contact.appendChild(name);
	contact.appendChild(number);
	contact.appendChild(star);
	contact.appendChild(remove);

	people.push(contact);

	people.sort(function(a, b) {
		let name1 = a.getElementsByClassName("name")[0].textContent.toLowerCase();
		let name2 = b.getElementsByClassName("name")[0].textContent.toLowerCase();

		if (name1 < name2) {
			return -1;
		} else {
			return 1;
		}
	});

	let contacts = document.getElementsByClassName("contact");
	Array.from(contacts).forEach(function(contact) {
		contact.parentElement.removeChild(contact);
	});

	people.forEach(function(person) {
		let contacts = document.getElementById("contacts");
		contacts.appendChild(person);
	});

	let form = document.getElementById("form-contact");
	form.reset();

	document.getElementById("form-firstname").classList.remove("input-valid");
	document.getElementById("form-surname").classList.remove("input-valid");
	document.getElementById("form-number").classList.remove("input-valid");
});

// let diallerPad = document.getElementById("dialler-pad");
// let downChevron = document.getElementById("dialler-pad-close");
// downChevron.addEventListener("click", function() {
// 	if (Array.from(diallerPad.classList).indexOf("opened") != -1) {
// 		diallerPad.classList.remove("opened");
// 		diallerPad.classList.add("closed");
// 	} else {
// 		diallerPad.classList.remove("closed");
// 		diallerPad.classList.add("opened");
// 	}
// });

let firstNameInput = document.getElementById("form-firstname");
let surnameInput = document.getElementById("form-surname");
let numberInput = document.getElementById("form-number");

firstNameInput.addEventListener("keyup", function() {
	if (this.value.trim() === "") {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (/\s/.test(this.value)) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (this.value.trim().length < 2) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (/[^a-zA-Z0-9-]/.test(this.value)) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (!/[a-z]/.test(this.value) && !/[A-Z]/.test(this.value)) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else {
		this.classList.remove("input-invalid");
		this.classList.add("input-valid");
	}
});

surnameInput.addEventListener("keyup", function() {
	if (this.value.trim() === "") {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (/\s/.test(this.value)) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (this.value.trim().length < 2) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (/[^a-zA-Z0-9-]/.test(this.value)) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (!/[a-z]/.test(this.value) && !/[A-Z]/.test(this.value)) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else {
		this.classList.remove("input-invalid");
		this.classList.add("input-valid");
	}
});

numberInput.addEventListener("keyup", function() {
	if (this.value.trim() === "") {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (/[^\d]/.test(this.value)) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else if (this.value.trim().length < 2 || this.value.trim().length > 13) {
		this.classList.remove("input-valid");
		this.classList.add("input-invalid");
	} else {
		this.classList.remove("input-invalid");
		this.classList.add("input-valid");
	}
});

function validateFirstName(fn) {
	if (fn.trim() === "") {
		return "First name not entered\n";
	} else if (/\s/.test(fn)) {
		return "First name must not contain whitespace\n";
	} else if (fn.trim().length < 2) {
		return "First name length must be at least 2 characters\n";
	} else if (/[^a-zA-Z0-9-]/.test(fn)) {
		return "First name can only contain characters from a to z, A to Z, 0 to 9 and hyphens\n";
	} else if (!/[a-z]/.test(fn) && !/[A-Z]/.test(fn)) {
		return "First name must contain at least one character from the english alphabet\n";
	} else {
		let contacts = document.getElementsByClassName("contact");
		if (Array.from(contacts).length > 0) {
			Array.from(contacts).forEach(function(contact) {
				if (fn == contact.getElementsByClassName("name")[0].textContent.split(" ")[0]) {
					repeatName += "X";
				}
			});
		}
		return "";
	}
}

function validateSurname(sn) {
	if (sn.trim() === "") {
		return "Surname not entered\n";
	} else if (/\s/.test(sn)) {
		return "Surname must not contain whitespace\n";
	} else if (sn.trim().length < 2) {
		return "Surname length must be at least 2 characters\n";
	} else if (/[^a-zA-Z0-9-]/.test(sn)) {
		return "Surname can only contain characters from a to z, A to Z, 0 to 9 and hyphens\n";
	} else if (!/[a-z]/.test(sn) && !/[A-Z]/.test(sn)) {
		return "Surname must contain at least one character from the english alphapet\n";
	} else {
		let contacts = document.getElementsByClassName("contact");
		if (Array.from(contacts).length > 0) {
			Array.from(contacts).forEach(function(contact) {
				if (sn == contact.getElementsByClassName("name")[0].textContent.split(" ")[1]) {
					repeatName += "X";
				}
			});
		}

		return "";
	}
}

function validateNumber(n) {
	if (n.trim() === "") {
		return "Phone number not entered\n";
	} else if (/[^\d]/.test(n)) {
		return "Phone number must only contain digits\n";
	} else if (n.trim().length < 2 || n.trim().length > 13) { // This excludes country codes
		// Minimum emergency number length is 2 (Alferia, Morocco, Senegal, etc.)
		// Minimum regular number length is 4 (St. Helena)
		// Maximum regular number length is 13 (Austria)
		return "Phone number must be between 2 characters and 13 characters long\n";
	} else {
		let contacts = document.getElementsByClassName("contact");
		let repeatNumber = 0;
		if (Array.from(contacts).length > 0) {
			Array.from(contacts).forEach(function(contact) {
				if (n == contact.getElementsByClassName("number")[0].textContent) {
					repeatNumber = 1;
				}
			});
		}

		if (repeatNumber) {
			return "Phone number already exists\n";
		} else {
			return "";
		}
	}
}

const dialler = document.getElementById("dialler");
const contacts = document.getElementById("contacts");
const favourites = document.getElementById("favourites");

const tabs = document.getElementsByClassName("nav-item");
Array.from(tabs).forEach(function(tab) {
	tab.addEventListener("click", function() {
		switch (this.textContent) {
			case "Dialler":
				contacts.style.display = "none";
				favourites.style.display = "none";
				dialler.style.display = "block";
				break;
			case "Contacts":
				dialler.style.display = "none";
				favourites.style.display = "none";
				contacts.style.display = "block";
				break;
			case "Favourites":
				dialler.style.display = "none";
				contacts.style.display = "none";
				favourites.style.display = "block";
				break;
		}
	});
});

let padItems = document.getElementsByClassName("pad");
Array.from(padItems).forEach(function(pad) {
	pad.addEventListener("click", function() {
		let display = document.getElementById("display");
		switch (pad.id) {
			case "dialler-pad-call":
				// Checks for mobile devices, can be bypassed
				// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				if (/Mobi|Android/i.test(navigator.userAgent)) {
					// Add logic for sending user to phone app with input number if they are using a mobile
					window.open(`tel:${display.textContent}`);
				}
				break;
			case "dialler-pad-close":
				// Add logic for closing dialler pad
				break;
			case "dialler-pad-backspace":
				display.textContent = display.textContent.slice(0, display.textContent.length - 1);
				break;
			default:
				display.textContent += pad.textContent;
				break;
		}
	});
});

// Should receive error title and error message as arguments
function error(text) {
	let errorMessage = document.getElementById("error-message");

	let errorMessageTitle = document.getElementById("error-message-title");
	errorMessageTitle.textContent = "Error!";

	let errorMessageText = document.getElementById("error-message-text");
	errorMessageText.appendChild(text);

	errorMessage.style.visibility = "visible";

	setTimeout(function() {
		errorMessage.style.visibility = "hidden";
		// Clear the error title
		errorMessageTitle.textContent = "";
		// Remove all error messages
		while(errorMessageText.firstChild) {
			errorMessageText.removeChild(errorMessageText.firstChild);
		}
	}, 2500);
}

let callIcon = document.getElementById("dialler-pad-call");
callIcon.addEventListener("click", function() {
	let recentCalls = document.getElementById("recent-calls");
	let number = document.getElementById("display").textContent;
	// If contact with that number exists...
	if (0) {

	} else { // If there is no contact with that number...
		let callInfo = document.createElement("div");

		let callIcon = document.createElement("span");
		callIcon.className = "avatar";
		callIcon.style.backgroundColor = colors[Math.floor(Math.random() * 24)];

		let callNameNumber = document.createElement("span");
		callNameNumber.className = "name-number";

		let callName = document.createElement("span");
		callName.className = "name";
		// 
		if (0) { // Name exists in contacts
			// callName.textContent = `${The name of that contact}`;
			callName.textContent = "...";
		} else {
			callName.textContent = "Unknown";
		}

		let callNumber = document.createElement("span");
		callNumber.className = "number";
		callNumber.textContent = number;

		callNameNumber.appendChild(callName);
		callNameNumber.appendChild(callNumber);

		let date = document.createElement("span");
		date.className = "date";
		date.textContent = `${(new Date()).getDate()}/${(new Date()).getMonth() + 1}/${String((new Date()).getFullYear()).slice(2)}`;

		let time = document.createElement("span");
		time.class = "time";
		time.textContent = `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`;

		let callDateTime = document.createElement("span");
		callDateTime.className = "date-time";
		// callDateTime.textContent = `${(new Date()).getDate()}/${(new Date()).getMonth() + 1}/${String((new Date()).getFullYear()).slice(2)} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`;
		callDateTime.appendChild(date);
		callDateTime.appendChild(time);

		callInfo.appendChild(callIcon);
		callInfo.appendChild(callNameNumber)
		// callInfo.appendChild(callName);
		// callInfo.appendChild(callNumber);
		callInfo.appendChild(callDateTime);

		recentCalls.appendChild(callInfo);
	}
});