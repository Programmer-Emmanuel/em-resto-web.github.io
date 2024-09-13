// sendgrid.js
const sgMail = require('@sendgrid/mail');

// Remplacez 'YOUR_SENDGRID_API_KEY' par votre clé API SendGrid
sgMail.setApiKey('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');

module.exports = sgMail;

