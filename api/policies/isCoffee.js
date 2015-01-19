module.exports = function(req, res, next) {

  if (req.session.coffee) {
    return next();
  } else {
    res.redirect('/coffee');
  }

};