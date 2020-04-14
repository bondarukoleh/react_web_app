function isLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({error: `You are not authorized, please sign in.`});
  }
  next()
}

module.exports = {isLoggedIn};