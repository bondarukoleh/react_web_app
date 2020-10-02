export function validateEmails(emails) {
  const validEmailRegEx = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  const emailsArray = emails.split(',').map(email => email.trim());
  const invalidEmails = emailsArray.filter(email => !validEmailRegEx.test(email));
  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}. Please comma separate the recipients.`;
  }
  return null;
}