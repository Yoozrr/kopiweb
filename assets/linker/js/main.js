(function() {
  var selectedCoffee;

  io.socket.on('connect', function() {

    $('.coffee').click(function() {
      $('.coffee').removeClass('active');

      var target = $(this);
      target.addClass('active');

      selectedCoffee = JSON.parse(target.attr('data'));

      $('.selected-coffee').addClass('open');
      $('.selected-coffee-name').text(selectedCoffee.name);
      $('.selected-coffee-category').text(selectedCoffee.category);

      var form = $('.selected-coffee form');
      form.find('input[name="id"]').val(selectedCoffee.id);
      form.find('input[name="name"]').val(selectedCoffee.name);
      form.find('input[name="price"]').val(selectedCoffee.price);
      form.find('input[name="category"]').val(selectedCoffee.category);

      target.attr('id');
    });
  });

  if ($('.geolocation').length > 0) {
    var info = $('.geolocation .info');
    var infoPos = $('.geolocation .position');
    var infoDist = $('.geolocation .distance');

    if (navigator.geolocation) {
      info.text('Locating your current position, please wait.');

      navigator.geolocation.getCurrentPosition(function(position) {
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;

        var index = 0;
        var maps = $('#mapdata li');
        var origin = new google.maps.LatLng(lat, lng);
        var service = new google.maps.DistanceMatrixService();
        var alldistance = [];

        infoDist.removeClass('hide');
        infoPos.removeClass('hide');
        infoPos.text('Latitude: ' + lat + ', Longitude: ' + lng);
        info.text('Found your location. Calculating the nearest store, please wait.');

        function getDistance() {
          var map = maps.eq(index);
          var dest = new google.maps.LatLng(map.attr('lat'), map.attr('lng'));

          service.getDistanceMatrix({
              origins: [origin],
              destinations: [dest],
              travelMode: google.maps.TravelMode.DRIVING,
              avoidHighways: false,
              avoidTolls: false
            },
            onDistanceMatrix
          );
        }

        function onDistanceMatrix(response, status) {
          var distance = response.rows[0].elements[0].distance;

          console.log(distance);

          infoDist.text(maps.eq(index).attr('name') + ': ' + distance.text);

          alldistance.push({
            t: distance.text,
            d: distance.value,
            i: index
          });

          index++;

          if (index < maps.length) {
            getDistance();
          } else {
            getNearestDistance();
          }
        }

        function getNearestDistance() {

          alldistance.sort(function(a, b) {
            if (a.d > b.d) {
              return 1;
            }
            if (a.d < b.d) {
              return -1;
            }
            return 0;
          });

          var nearest = alldistance[0].d;
          var nearesttext = alldistance[0].t;
          var nearestindex = alldistance[0].i;

          var txt = 'There nearest store is name is ' + maps.eq(nearestindex).attr('name');
          txt += ', located at ' + maps.eq(nearestindex).attr('address');
          txt += '. The distance is about ' + nearesttext;
          txt += '.';
          infoDist.text(txt);

          $('.select-suggested, .select-manually').removeClass('hide');

          $('.select-suggested').click(function(e) {
            e.preventDefault();

            var target = maps.eq(nearestindex);
            $('.location-name')
              .text(target.attr('address'))
              .addClass('open');

            var form = $('.selected-coffee form');
            form.find('input[name="id"]').val(target.attr('id'));
            form.find('input[name="name"]').val(target.attr('name'));
            form.find('input[name="address"]').val(target.attr('address'));

            info.text('Please continue to order confirmation.');

            infoPos.addClass('hide');
            infoDist.addClass('hide');
            $('.selected-coffee button').prop('disabled', false);
            $('.select-suggested, .select-manually').addClass('hide');
          })

          $('.select-manually').click(function(e) {
            e.preventDefault();

            info.text('Please click on the red marker to select the store you prefer.');
            showMap();

            infoPos.addClass('hide');
            infoDist.addClass('hide');
            $('.select-suggested, .select-manually').addClass('hide');
          })
        }

        getDistance();
      });
    } else {
      info.text('Your browser does not support geolocation. Please select the store manually by clicking the red marker.');
      showMap()
    }
  }



  function showMap() {
    if ($('#gmap').length > 0) {
      var map = new GMaps({
        div: '#gmap',
        lat: 3.137831,
        lng: 101.610231,
        zoom: 11
      });

      $('#mapdata li').each(function(i, v) {

        var target = $(this);
        map.addMarker({
          lat: target.attr('lat'),
          lng: target.attr('lng'),
          title: target.attr('name'),
          click: function(e) {
            $('.location-name')
              .text(target.attr('address'))
              .addClass('open');

            $('.selected-coffee button').prop('disabled', false);
            var form = $('.selected-coffee form');
            form.find('input[name="id"]').val(target.attr('id'));
            form.find('input[name="name"]').val(target.attr('name'));
            form.find('input[name="address"]').val(target.attr('address'));
          }
        });
      })
    }
  }

})();