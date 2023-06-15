        const mapOptions = {
        center: { lat: 22.5726, lng: -88.3639 }, 
        zoom: 12
        };
        const map = new google.maps.Map(document.getElementById("map"), mapOptions);
        const directionsService = new google.maps.DirectionsService();
        const directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        // User input a pin code and get the physical address
        function getAddress() {
        const pincode = document.getElementById("pincode").value;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': pincode }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const address = results[0].formatted_address;
            document.getElementById("address").textContent = address;
          } else {
            document.getElementById("address").textContent = "No results found.";
          }
        } else {
          document.getElementById("address").textContent = "Geocoder failed due to: " + status;
        }
      });
    }

// Reverse Geolocation
    function getPincode() {
      const address = document.getElementById("address2").value;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            const pincode2 = getPincodeFromAddressComponents(results[0].address_components);
            document.getElementById("pincode2").textContent = pincode2;
          } else {
            document.getElementById("pincode2").textContent = "No results found.";
          }
        } else {
          document.getElementById("pincode2").textContent = "Geocoder failed due to: " + status;
        }
      });
    }

    function getPincodeFromAddressComponents(components) {
      for (let i = 0; i < components.length; i++) {
        const types = components[i].types;
        if (types.includes('postal_code')) {
          return components[i].short_name;
        }
      }
      return "Pin code not found";
    }
// Route Direction

    function calculateRoute() {
      const routeOrigin = document.getElementById("route-origin").value;
      const routeDestination = document.getElementById("route-destination").value;

      const request = {
        origin: routeOrigin,
        destination: routeDestination,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        } else {
          console.log("Error: " + status);
        }
      });
    }

//  Distance Calculation
    function calculateDistance() {
      const origin = document.getElementById("distance-origin").value;
      const destination = document.getElementById("distance-destination").value;

      const distanceService = new google.maps.DistanceMatrixService();
      const matrixRequest = {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING
      };

      distanceService.getDistanceMatrix(matrixRequest, function(response, status) {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          const distance = response.rows[0].elements[0].distance.text;
          document.getElementById("distance").textContent = distance;
        } else {
          document.getElementById("distance").textContent = "Error calculating distance.";
        }
      });
    }