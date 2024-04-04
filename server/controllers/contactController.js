const Contact = require("../models/contactModel");

module.exports.addContactForm = async (req, res) => {
    const { name, email, message } = req.body;
    console.log("req body in contact", req.body);
    try {

        // Create new contact instance
        const newContact = new Contact({
            name,
            email,
            message
        });

        // Save contact data to database
        await newContact.save();

        res.status(201).json({ success: true, message: 'Form data saved successfully' });
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ success: false, message: 'Error saving form data' });
    }
};