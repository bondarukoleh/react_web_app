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
<div style="text-align: center">
    <h3>${survey.title}</h3>
    <p>Please answer the following question:</p>
    <div>${survey.body}</div>
    <div><a href="${getRedirectUrl(true, survey.id)}">Yes</a></div>
    <div><a href="${getRedirectUrl(false, survey.id)}">No</a></div>
    <p>Thank you for participation, have a nice day!</p>
    <h4>!!! IF YOU DON'T KNOW WHAT THE HELL THIS IS !!!</h4>
    <p>This is an email from test application that I've created,
    if someone uses it to annoy you, I'm sorry, please write me back to <strong>bondaruqaqa@gmail.com</strong>
    and I will turn it off, so any bastard cannot bother you with it anymore.</p>
</div>
</body>
</html>
`;


module.exports = {surveyTemplate};
