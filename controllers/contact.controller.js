const Contact = require("../models/contact.model.js");

var serverErrorCode 	  = 500;
var insertCode		  = 201;
var successCode		  = 200;
var notFoundCode		  = 404;
var validationFailCode  = 400;

var serverErrorMsg 	= 'Internal Server Error';
var insertMsg		  	= 'Insert Success';
var successMsg		= 'Execute Data Success';
var notFoundMsg		= 'Not Found';
var validationFailMsg	= 'Validation Fail';

var phoneValidation = /^(^\+62\s?|^0)(\d{3,4}?){2}\d{3,4}$/;
var dateValidation  = /^\d{4}(\/)([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))$/;

// Create and Save a new Contact
exports.create = (req, res) => {
	let body = req.body
	 
	if (!body.name) {
		return res.status(validationFailCode).send({
			code 	: validationFailCode,
	    	message	: "name can not be empty!"
	    });
	}

	if (!body.number) {
		return res.status(validationFailCode).send({
			code 	: validationFailCode,
	    	message	: "number can not be empty!"
	    });
	}


	if (! req.body.number.match(phoneValidation)) {
	    return res.status(validationFailCode).send({
			code 	: validationFailCode,
	    	message	: "Number not valid!, ex: 081212408246 or +6281212408246"
	    });
	}

	if (body.birthday && ! req.body.birthday.match(dateValidation)) {
	    return res.status(validationFailCode).send({
			code 	: validationFailCode,
	    	message	: "Birthday not valid!, ex: 1995/01/31"
	    });
	}

	// Create a Contact
	const contact = new Contact({
	    name		: req.body.name,
	    number		: (req.body.number).replace("+62", 0),
	    address		: req.body.address,
	    birthplace	: req.body.birthplace,
	    birthday	: req.body.birthday,
	    info		: req.body.info
	});

	contact.save()
    .then((data) => {
        return res.status(insertCode).send({
    		code 	: insertCode,
    		message	: insertMsg,
    		data 	: data
    	});

    }).catch(err => {
        return res.status(serverErrorCode).send({
			code 	: serverErrorCode,
	    	message	: err.message || "Some error occurred while creating the Contact."
	    });
    });
};

// Retrieve all Contacts from the database.
exports.findAll = (req, res) => {
    Contact.find()
    .then(data => {
        return res.status(successCode).send({
	    	code 	: successCode,
	    	message : successMsg,
	    	count 	: data.length,
	    	data 	: data
    	});
    }).catch(err => {
        return res.status(serverErrorCode).send({
    		code 	: validationFailCode,
        	message: err.message || "Some error occurred while retrieving contacts."
    	});
    });
};

// Find a single Contact with a contactId
exports.findOne = (req, res) => {

	Contact.findById(req.params.contactId)
    .then(data => {
        if(!data) {
            return res.status(notFoundCode).send({
		    	code 	: notFoundCode,
		    	message : `Contact with id ${req.params.contactId} ${notFoundMsg}`
	    	});     
        }

    	return res.status(successCode).send({
	    	code 	: successCode,
	    	message : successMsg,
	    	data 	: data
    	});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
	   	// if (err.kind === "not_found") {
            return res.status(notFoundCode).send({
		    	code 	: notFoundCode,
		    	message : `Contact with id ${req.params.contactId} ${notFoundMsg}`
	    	});                
        }

        return res.status(serverErrorCode).send({
	    	code 	: serverErrorCode,
	    	message : serverErrorMsg
    	});
    });
};

// Update a Contact identified by the contactId in the request
exports.update = (req, res) => {
	// Validate request
	if (! req.body) {
		return res.status(validationFailCode).send({
			code 	: validationFailCode,
	    	message	: "Content can not be empty!"
	    });
	}

	if (! req.body.number.match(phoneValidation)) {
	    return res.status(validationFailCode).send({
			code 	: validationFailCode,
	    	message	: "Number not valid!, ex: 081212408246 or +6281212408246"
	    });
	}

	if (! req.body.birthday.match(dateValidation)) {
	    return res.status(validationFailCode).send({
			code 	: validationFailCode,
	    	message	: "Birthday not valid!, ex: 1995/01/31"
	    });
	}

	Contact.findOneAndUpdate({_id: req.params.contactId}, {$set: req.body}, { new: true })
    .then(data => {
        if(!data) {
            return res.status(notFoundCode).send({
		    	code 	: notFoundCode,
		    	message : `Contact with id ${req.params.contactId} ${notFoundMsg}`
	    	});
        }

        return res.status(insertCode).send({
    		code 	: insertCode,
    		message	: 'Update Success',
    		data 	: data
    	});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFoundCode).send({
		    	code 	: notFoundCode,
		    	message : `Contact with id ${req.params.contactId} ${notFoundMsg}`
	    	});               
        }
        
        return res.status(serverErrorCode).send({
	    	code 	: serverErrorCode,
	    	message : serverErrorMsg
    	});
    });
};

// Delete a Contact with the specified contactId in the request
exports.delete = (req, res) => {

	Contact.findByIdAndRemove(req.params.contactId)
    .then(data => {
        if(!data) {
            return res.status(notFoundCode).send({
		    	code 	: notFoundCode,
		    	message : `Contact with id ${req.params.contactId} ${notFoundMsg}`
	    	});
        }
        
        return res.status(successCode).send({
    		code 	: successCode,
    		message	: `Contacts was deleted successfully!!`
    	});

    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFoundCode).send({
		    	code 	: notFoundCode,
		    	message : `Contact with id ${req.params.contactId} ${notFoundMsg}`
	    	});              
        }
        
        return res.status(serverErrorCode).send({
	    	code 	: serverErrorCode,
	    	message : serverErrorMsg
    	});
    });
};