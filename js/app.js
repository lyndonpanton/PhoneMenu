let navItems = document.getElementsByClassName("nav-item");
Array.from(navItems).forEach(function(item) {
	item.addEventListener("click", function() {
		for (let i = 0; i < Array.from(navItems).length; i++) {
			navItems[i].classList.remove("selected");
		}

		item.classList.add("selected");
	});
});

let contactForm = document.getElementById("form-contact");
contactForm.addEventListener("submit", function(e) {
	e.preventDefault();

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

	// Remember to add validation for input elements ///////////////////////////
	let formFirstName = document.getElementById("form-firstname").value;
	let formSurname = document.getElementById("form-surname").value;
	let formNumber = document.getElementById("form-number").value;

	let avatar = document.createElement("span");
	avatar.className = "avatar";
	avatar.backgroundColor = colors[Math.floor(Math.random() * 24)];
	// console.log(colors[Math.floor(Math.random() * 24)]);

	let name = document.createElement("span");
	name.className = "name";
	name.textContent = `${formFirstName} ${formSurname}`;

	let number = document.createElement("span");
	number.className = "number";
	number.textContent = `${formNumber}`;

	let remove = document.createElement("div");
	remove.className = "remove";
	remove.textContent = "\u00D7";

	contact.appendChild(avatar);
	contact.appendChild(name);
	contact.appendChild(number);
	contact.appendChild(remove);

	let contacts = document.getElementById("contacts");
	contacts.appendChild(contact);

});