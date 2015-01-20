/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {
    Order.find(function found(err, orders) {
      if (err) return next(err);

      res.view({
        orders: orders
      });
    })
  },
  confirmation: function(req, res) {
    res.view();
  },

  create: function(req, res) {
    var params = {
      coffee: {},
      location: {},
      user: {}
    }

    Order.create(params, function(err, order) {

      Order.findOne(order, function(err, value) {

        order.coffee = req.session.coffee;
        order.location = req.session.location;
        order.user = {
          id: req.session.user.id,
          name: req.session.user.name
        }
        order.status = 'Submitted';

        order.save(function(err) {

          User.findOne(req.session.user.id, function(err, user) {
            user.hasOrdered = true;
            req.session.user = user;

            user.save(function() {
              delete req.session.coffee;
              delete req.session.location;

              res.redirect('/user/order');
            });
          });

        });
      });

    })
  },
  update: function(req, res, next) {
    Order.findOne(req.param('id'), function found(err, order) {
      if (err) return next(err);

      var status = [
        'Submitted',
        'Received',
        'Completed',
        'Canceled'
      ];

      if (_.contains(status, req.param('status'))) {
        order.status = req.param('status');
        order.save(function(err) {
          return;
        });
      }
      return;
    });

  }
}