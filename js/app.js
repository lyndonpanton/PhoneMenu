let navItems = document.getElementsByClassName("nav-item");
Array.from(navItems).forEach(function(item) {
	item.addEventListener("click", function() {
		for (let i = 0; i < Array.from(navItems).length; i++) {
			navItems[i].classList.remove("selected");
		}

		item.classList.add("selected");
	});
});

let starred = [];
let removeButtons = [];

let contactForm = document.getElementById("form-contact");
contactForm.addEventListener("submit", function(e) {
	e.preventDefault();

	let formFirstName = document.getElementById("form-firstname").value;
	let formSurname = document.getElementById("form-surname").value;
	let formNumber = document.getElementById("form-number").value;

	let errorString = "";
	errorString += `${validateFirstName(formFirstName)}`;
	errorString += `${validateSurname(formSurname)}`;
	errorString += `${validateNumber(formNumber)}`;

	if (errorString.length) {
		console.log(errorString);
		return false;
	}

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

	let contact = document.createElement("div");
	contact.className = "contact";

	let avatar = document.createElement("span");
	avatar.className = "avatar";
	avatar.style.backgroundColor = colors[Math.floor(Math.random() * 24)];
	// console.log(colors[Math.floor(Math.random() * 24)]);

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
			console.log(starred);

			let favourites = document.getElementById("favourites");

			while (favourites.firstChild) {
				favourites.removeChild(favourites.firstChild);
			}

			starred.forEach(function(contact) {
				let clone = contact.cloneNode(true);
				favourites.appendChild(clone);
			});
		} else {
			this.classList.remove("star-yellow");
			this.classList.add("star-black");
			starred.splice(starred.indexOf(this.parentElement), 1);
			console.log(starred);
		}
	});

	let remove = document.createElement("div");
	remove.className = "remove";
	remove.textContent = "\u00D7";

	contact.appendChild(avatar);
	contact.appendChild(name);
	contact.appendChild(number);
	contact.appendChild(star);
	contact.appendChild(remove);

	let contacts = document.getElementById("contacts");
	contacts.appendChild(contact);

	let form = document.getElementById("form-contact");
	form.reset();

	removeButtons.push(remove);
	removeButtons.forEach(function(button) {
		button.addEventListener("click", function() {
			let parent = button.parentElement;
			let grandParent = button.parentElement.parentElement;
			grandParent.removeChild(parent);
		});
	});

	document.getElementById("form-firstname").classList.remove("input-valid");
	document.getElementById("form-surname").classList.remove("input-valid");
	document.getElementById("form-number").classList.remove("input-valid");
});

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
		return "";
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