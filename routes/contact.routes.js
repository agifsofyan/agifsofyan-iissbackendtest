module.exports = app => {
	const contact = require("../controllers/contact.controller.js");

	// Create a new Contact
	app.post("/contacts", contact.create);

	// Retrieve all Contacts
	app.get("/contacts", contact.findAll);

	// Retrieve a single Contact with contactId
	app.get("/contact/:contactId", contact.findOne);

	// Update a Contact with contactId
	app.put("/contact/:contactId", contact.update);

	// Delete a Contact with contactId
	app.delete("/contact/:contactId", contact.delete);
};