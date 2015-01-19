/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    coffee: {
      type: 'object'
    },
    location: {
      type: 'object'
    },
    user: {
      type: 'object'
    },
    status: {
      type: 'string'
    }
  }
};