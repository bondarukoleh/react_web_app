const sendGrid = require('@sendgrid/mail');

const {MAIL_SERVER_KEY} = require('../../config');
sendGrid.setApiKey(MAIL_SERVER_KEY);

class Mailer {
  constructor({fromEmail, subject, content, recipients}) {
    this.subject = subject;
    this.content = content;
    this.recipients = recipients;
    this.from_email = fromEmail;
  }

  async sendSurvey() {
    const request = {
      to: this.recipients,
      subject: this.subject,
      html: this.content,
      from: this.from_email,
      trackingSettings: {
        clickTracking: {
          enable: true
        },
      },
    };

    return sendGrid.sendMultiple(request);
  }
}

module.exports = {Mailer};