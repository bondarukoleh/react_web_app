const sendGrid = require('sendgrid');

const {mail: mailHelper} = sendGrid;

class Mailer extends mailHelper.Mail {
  constructor({title, subject, content, recipients}) {
    super();
    this.from_email = new mailHelper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new mailHelper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)
  }

  formatAddresses() {
    // to implement
  }
}

module.exports = {Mailer};