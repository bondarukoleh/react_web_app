const surveyTemplate = (content) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Emaily surveys</title>
</head>
<body>
<div style="text-align: center">
    <h3> Hello, this is an survey for you!</h3>
    <p>Please answer the following question:</p>
    <div>${content}</div>
    <div><a href="http://localhost:3000">Yes</a></div>
    <div><a href="http://localhost:3000">No</a></div>
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
