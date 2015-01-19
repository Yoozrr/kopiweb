/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {

    if (!req.session.coffee) {
      res.redirect('/coffee');
      return;
    }
    Location.find(function found(err, locations) {
      if (err) return next(err);

      res.view({
        locations: locations
      })
    })
  },

  select: function(req, res, next) {
    var location = {
      id: req.param('id'),
      name: req.param('name'),
      address: req.param('address'),
    }
    req.session.location = location

    res.redirect('/order/confirmation');
  }
};