(function iife() {
  'use strict';

  var photos = window.photos;

  return photos.getRecentPhotos()
    .then(function(arg) {console.log(arg);});
}());
