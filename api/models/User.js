/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      email: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string'
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    },
    online: {
      type: 'boolean',
      defaultsTo: false
    },
    hasOrdered: {
      type: 'boolean',
      defaultsTo: false
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    if (!values.password || values.password != values.confirmation) {
      return next({
        err: 'Password does not match with the confirmation'
      });
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) {
        return next(err);
      }
      values.encryptedPassword = encryptedPassword;

      next();
    })
  }
};