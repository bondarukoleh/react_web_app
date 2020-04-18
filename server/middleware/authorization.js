function isLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({error: `You are not authorized, please sign in.`});
  }
  next();
}

function hasCredits(req, res, next) {
  if (req.user.credit < 1) {
    return res.status(403).send({error: `You don't have enough credits.`});
  }
  next();
}


module.exports = {isLoggedIn, hasCredits};