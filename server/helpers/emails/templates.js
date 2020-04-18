const {onProd} = require('../common');
const {HOST, REACT_SERVER_PORT = 3000} = require('../../config');
const {surveys} = require('../../routes/routes.paths')

// TODO: refactor the hardcode
const getRedirectUrl = () => onProd() ? `${HOST}${surveys}/thanks` : `${HOST}:${REACT_SERVER_PORT}${surveys}/thanks`;

const surveyTemplate = (content) => `
<html lang="en">
<body>
<div style="text-align: center">
    <h3> Hello, this is an survey for you!</h3>
    <p>Please answer the following question:</p>
    <div>${content}</div>
    <div><a href="${getRedirectUrl()}">Yes</a></div>
    <div><a href="${getRedirectUrl()}">No</a></div>
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
