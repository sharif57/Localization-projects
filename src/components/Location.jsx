import { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px',
};

const mapStyle = [
  {
    "featureType": "administrative.province",
    "elementType": "all",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      { "lightness": "-8" }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#000000" }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.stroke",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "all",
    "stylers": [
      { "color": "#acacac" }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#484848" }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#ff0000" },
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "all",
    "stylers": [
      { "lightness": "-3" }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [
      { "saturation": -100 },
      { "lightness": "72" },
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [
      { "lightness": "23" }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      { "saturation": -100 },
      { "lightness": "30" },
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      { "lightness": "-19" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "lightness": "2" },
      { "gamma": "1.21" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      { "visibility": "off" },
      { "saturation": "15" },
      { "hue": "#ff0000" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      { "lightness": "-43" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "on" },
      { "lightness": "22" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      { "weight": "0.12" },
      { "lightness": "-23" },
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      { "visibility": "off" },
      { "lightness": "71" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
      { "saturation": -100 },
      { "visibility": "simplified" }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [
      { "saturation": -100 },
      { "lightness": 30 },
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [
      { "saturation": -100 },
      { "lightness": 40 },
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      { "saturation": -100 },
      { "visibility": "simplified" }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry.fill",
    "stylers": [
      { "saturation": "5" },
      { "visibility": "on" },
      { "lightness": "5" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "hue": "#ffff00" },
      { "lightness": "-24" },
      { "saturation": -97 }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "saturation": "-88" },
      { "lightness": "-23" },
      { "visibility": "on" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      { "visibility": "on" },
      { "lightness": -25 },
      { "saturation": -100 }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      { "weight": "0.01" },
      { "lightness": "9" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      { "lightness": "-32" },
      { "gamma": "2.99" }
    ]
  }
];

const Location = () => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const markerRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setLocation(newLocation);
          fetchRestaurants(newLocation);
        },
        (err) => {
          console.error('Error getting location:', err);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocation not supported');
    }
  }, []);

  const fetchRestaurants = async (location) => {
    if (location) {
      const { lat, lng } = location;
      const googleMapsApiKey = 'AIzaSyBFi80uuJIWkkLCpodFa8oXmD8XD_h8LMc';

      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=${googleMapsApiKey}`;

      try {
        const response = await fetch(placesUrl);
        const data = await response.json();

        if (data.results) {
          setRestaurants(data.results);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    }
  };

  const createMarker = (map) => {
    if (location) {
      markerRef.current = new google.maps.Marker({
        map,
        position: location,
        title: 'Your Location',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Custom icon for your location
          scaledSize: new google.maps.Size(40, 40), // Set size of the icon
        },
      });
    }
  };

  return (
    <div className="container mx-auto h-full p-4">
      <LoadScript googleMapsApiKey="AIzaSyBFi80uuJIWkkLCpodFa8oXmD8XD_h8LMc">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location || { lat: 0, lng: 0 }}
          zoom={14}
          onLoad={createMarker}
          options={{
            styles: mapStyle
          }}
        >
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={{
                lat: restaurant.geometry.location.lat,
                lng: restaurant.geometry.location.lng,
              }}
              title={restaurant.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Location;
