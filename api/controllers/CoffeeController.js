/**
 * CoffeeController
 *
 * @description :: Server-side logic for managing coffees
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res, next) {

    Coffee.find(function found(err, coffee) {
      if (err) return next(err);

      var catobj = [];

      _.each(coffee, function(item) {
        var category = {
          category: item.category
        };

        if (_.where(catobj, category).length == 0) {
          catobj.push({
            category: item.category,
            list: []
          });
        }

        var obj = _.findWhere(catobj, category);
        if (obj) {
          if (_.where(obj.list, {
            name: item.name
          }).length == 0) {
            obj.list.push(item);
          }
        }
      });

      res.view({
        coffees: catobj
      })
    })
  },

  select: function(req, res, next) {
    var coffee = {
      id: req.param('id'),
      name: req.param('name'),
      price: req.param('price'),
      category: req.param('category')
    }
    req.session.coffee = coffee

    res.redirect('/location');
  }
};