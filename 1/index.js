const Mailer = require('./mailer.js');
const Notification = require('./push-notification');
const SmsService = require('./sms-service');

function send(message) {
    this.sendMessage(message);
}

/**
 * 3 different type of codes and using context using bind() function
 * - allows connecting legacy code
 */

const callMailer = send.bind(new Mailer());
callMailer('Hello from Mailer')

const callNotification = send.bind(new Notification());
callNotification('Hello from Notification')

const callSmsService = send.bind(SmsService);
callSmsService("Hello from SMSService")




