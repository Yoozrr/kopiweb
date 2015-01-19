module.exports = function(req, res, next) {

  if (req.session.location) {
    return next();
  } else {
    res.redirect('/location');
  }

};