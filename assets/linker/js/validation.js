$(document).ready(function() {

  $('.form-register').validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        minlength: 6,
        required: true
      },
      confirmation: {
        minlength: 6,
        required: true,
        equalTo: '#password'
      }
    },

    success: function(element) {
      element.addClass('valid');
    }
  });

  $('.form-login').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        minlength: 6,
        required: true
      }
    },

    success: function(element) {
      element.text('OK!').addClass('valid');
    }
  });


  // $('.form-edit').validate({
  //   rules: {
  //     name: {
  //       required: true
  //     },
  //     email: {
  //       required: true,
  //       email: true
  //     }
  //   },

  //   success: function(element) {
  //     element.text('OK!').addClass('valid');
  //   }
  // });
  io.socket.on('connect', function() {
    console.log('sockect connect');

    io.socket.on('message', function(msg) {
      console.log(msg)
    })
  });



});