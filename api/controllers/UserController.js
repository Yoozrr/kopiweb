/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {
    res.view();
  },
  login: function(req, res) {
    res.view();
  },

  authenticate: function(req, res, next) {
    if (!req.param('email') || !req.param('password')) {
      req.session.flash = {
        err: [{
          name: 'emailPasswordError',
          message: 'You must enter both email and password'
        }]
      }
      res.redirect('/user/login');
      return;
    }

    User.findOneByEmail(req.param('email'), function foundEmail(err, user) {
      if (err) return next(err);

      if (!user) {
        req.session.flash = {
          err: [{
            name: 'noAccount',
            message: 'The email address ' + req.param('email') + ' not found.'
          }]
        }
        res.redirect('/user/login');
        return;
      }

      require('bcrypt').compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) {
          return next(err);
        }

        if (!valid) {
          req.session.flash = {
            err: [{
              name: 'emailPasswordMismatched',
              message: 'Invalid email and password combination.'
            }]
          }

          res.redirect('/user/login');
          return;
        }

        req.session.authenticated = true;
        req.session.user = user;

        user.online = true;

        user.save(function(err, user) {
          if (err) {
            next(err);
          }

          if (req.session.user.admin) {
            res.redirect('/user');
            return;
          }

          res.redirect('/coffee');
        })


      });
    })
  },

  register: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    var params = {
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    };

    User.create(params, function userCreated(err, user) {
      if (err) {
        req.session.flash = {
          err: err
        };
        return res.redirect('/user/register');
      }

      req.session.authenticated = true;
      req.session.user = user;

      res.redirect('/');
    });
  },

  logout: function(req, res) {
    User.findOne(req.session.user.id, function foundUser(err, user) {
      User.update(req.session.user.id, {
        online: false
      }, function(err) {
        if (err) {
          return next(err);
        }
        req.session.destroy();
        res.redirect('/')
      })
    });
  },

  order: function(req, res) {
    console.log(req.session.user);
    Order.find({
      where: {
        'user.id': req.session.user.id
      }
    }, function(err, orders) {
      res.view({
        orders: orders
      });
    });


  }
};