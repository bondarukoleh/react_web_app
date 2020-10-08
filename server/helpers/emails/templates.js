const {onProd} = require('../common');
const {HOST, REACT_SERVER_PORT = 3000} = require('../../config');
const {surveys} = require('../../routes/routes.paths');

// TODO: refactor the hardcode
const getRedirectUrl = (positive, surveyId) => {
  const baseUrl = onProd() ? `${HOST}${surveys}` : `${HOST}:${REACT_SERVER_PORT}${surveys}`;
  return `${baseUrl}/${surveyId}/${positive ? 'yes' : 'no'}`;
};

const surveyTemplate = (survey) => `
<html lang="en">
<body>
<div style="width: 100vw">
<div style="text-align: center; background-color: #cad8f8; font-family: Arial, serif; width: 80%">
  <h2>${survey.title}</h2>
  <p><b>Please answer the following question:</b></p>
  <div style="margin: 1rem">${survey.body}</div>
  <div>
    <a style="color: white; text-decoration: none; padding: .5rem 1rem; background-color: #0d47a1" href="${getRedirectUrl(true, survey.id)}">Yes</a>
    <a style="color: white; text-decoration: none; padding: .5rem 1rem; background-color: #af3136" href="${getRedirectUrl(false, survey.id)}">No</a>
  </div>
  <p style="font-style: italic">Thank you for participation, have a nice day!</p>
  <div style="background-color: #ffa29e; padding: .5rem">
    <h4 style="text-decoration: underline">!!! IF YOU DON'T KNOW WHAT THE HELL THIS IS !!!</h4>
    <p>This is an email from test application that I've created,
      if someone uses it to annoy you, I'm sorry, please write me back to <strong>bondaruqaqa@gmail.com</strong>
      and I will turn it off, so any bastard cannot bother you with it anymore.</p>
  </div>
</div>
</div>
</body>
</html>
`;


module.exports = {surveyTemplate};
