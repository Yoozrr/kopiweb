module.exports = function(req, res, next) {
  if (req.session.user && req.session.user.admin === true) {
    return next();
  } else {

    res.redirect('/');
    return;
  }

};